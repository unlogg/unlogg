import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useClipboardCopy } from "../use-clipboard-copy.js";

// Mock the navigator.clipboard API
const mockWriteText = vi.fn();
const mockClipboard = {
  writeText: mockWriteText,
};

Object.defineProperty(navigator, "clipboard", {
  value: mockClipboard,
  writable: true,
});

describe("useClipboardCopy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useClipboardCopy());

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.copy).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("should copy text successfully", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboardCopy());

    await act(async () => {
      await result.current.copy("Hello, World!");
    });

    expect(mockWriteText).toHaveBeenCalledWith("Hello, World!");
    expect(result.current.copied).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("should reset copied state after timeout", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboardCopy({ timeout: 1000 }));

    await act(async () => {
      await result.current.copy("Test text");
    });

    expect(result.current.copied).toBe(true);

    // Fast-forward time and wrap in act
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.copied).toBe(false);
  });

  it("should handle copy errors", async () => {
    const error = new Error("Clipboard access denied");
    mockWriteText.mockRejectedValue(error);

    const { result } = renderHook(() => useClipboardCopy());

    await act(async () => {
      await result.current.copy("Test text");
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBe(error);
  });

  it("should handle clipboard API not supported", async () => {
    // Mock a scenario where navigator.clipboard exists but writeText doesn't
    const originalWriteText = navigator.clipboard.writeText;
    delete (navigator.clipboard as any).writeText;

    const { result } = renderHook(() => useClipboardCopy());

    await act(async () => {
      await result.current.copy("Test text");
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error?.message).toBe("Clipboard API not supported");

    // Restore writeText method
    navigator.clipboard.writeText = originalWriteText;
  });
  it("should handle missing writeText method", async () => {
    // Temporarily override writeText with undefined
    const originalWriteText = navigator.clipboard.writeText;
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useClipboardCopy());

    await act(async () => {
      await result.current.copy("Test text");
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error?.message).toBe("Clipboard API not supported");

    // Restore writeText method
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: originalWriteText,
      writable: true,
      configurable: true,
    });
  });

  it("should call onSuccess callback", async () => {
    mockWriteText.mockResolvedValue(undefined);
    const onSuccess = vi.fn();

    const { result } = renderHook(() => useClipboardCopy({ onSuccess }));

    await act(async () => {
      await result.current.copy("Success text");
    });

    expect(onSuccess).toHaveBeenCalledWith("Success text");
  });

  it("should call onError callback", async () => {
    const error = new Error("Copy failed");
    mockWriteText.mockRejectedValue(error);
    const onError = vi.fn();

    const { result } = renderHook(() => useClipboardCopy({ onError }));

    await act(async () => {
      await result.current.copy("Error text");
    });

    expect(onError).toHaveBeenCalledWith(error);
  });

  it("should handle non-Error objects in catch block", async () => {
    mockWriteText.mockRejectedValue("String error");

    const { result } = renderHook(() => useClipboardCopy());

    await act(async () => {
      await result.current.copy("Test text");
    });

    expect(result.current.error?.message).toBe("Failed to copy to clipboard");
  });

  it("should reset state manually", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboardCopy());

    await act(async () => {
      await result.current.copy("Test text");
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should clear timeout when reset is called", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboardCopy({ timeout: 5000 }));

    await act(async () => {
      await result.current.copy("Test text");
    });

    expect(result.current.copied).toBe(true);

    // Reset before timeout
    act(() => {
      result.current.reset();
    });

    expect(result.current.copied).toBe(false);

    // Advance time past the original timeout
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Should still be false (timeout was cleared)
    expect(result.current.copied).toBe(false);
  });

  it("should clear existing timeout when copying again", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboardCopy({ timeout: 2000 }));

    // First copy
    await act(async () => {
      await result.current.copy("First text");
    });

    expect(result.current.copied).toBe(true);

    // Advance time partially
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Second copy (should reset the timeout)
    await act(async () => {
      await result.current.copy("Second text");
    });

    expect(result.current.copied).toBe(true);

    // Advance by the partial time from first timeout
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Should still be true (first timeout was cleared)
    expect(result.current.copied).toBe(true);

    // Advance by remaining time for second timeout
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Now should be false
    expect(result.current.copied).toBe(false);
  });

  it("should use custom timeout", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboardCopy({ timeout: 500 }));

    await act(async () => {
      await result.current.copy("Custom timeout text");
    });

    expect(result.current.copied).toBe(true);

    // Advance by less than timeout
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current.copied).toBe(true);

    // Advance past timeout
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.copied).toBe(false);
  });

  it("should cleanup timeout on unmount", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result, unmount } = renderHook(() =>
      useClipboardCopy({ timeout: 5000 })
    );

    await act(async () => {
      await result.current.copy("Unmount test");
    });

    expect(result.current.copied).toBe(true);

    // Unmount the hook
    unmount();

    // Advance time past timeout
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Should not cause any errors (timeout was cleaned up)
    expect(true).toBe(true); // Test passes if no errors thrown
  });

  it("should handle stable function references", () => {
    const { result, rerender } = renderHook(() => useClipboardCopy());

    const initialCopy = result.current.copy;
    const initialReset = result.current.reset;

    rerender();

    expect(result.current.copy).toBe(initialCopy);
    expect(result.current.reset).toBe(initialReset);
  });

  it("should return all expected properties", () => {
    const { result } = renderHook(() => useClipboardCopy());

    expect(result.current).toHaveProperty("copied");
    expect(result.current).toHaveProperty("copy");
    expect(result.current).toHaveProperty("error");
    expect(result.current).toHaveProperty("reset");

    expect(typeof result.current.copied).toBe("boolean");
    expect(typeof result.current.copy).toBe("function");
    expect(typeof result.current.reset).toBe("function");
    expect(
      result.current.error === null || result.current.error instanceof Error
    ).toBe(true);
  });
});
