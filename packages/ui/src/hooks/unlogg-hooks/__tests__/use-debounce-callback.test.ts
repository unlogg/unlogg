import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounceCallback } from "../use-debounce-callback.js";

describe("useDebounceCallback", () => {
  let mockCallback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCallback = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should return a debounced function and cancel handler", () => {
    const { result } = renderHook(() => useDebounceCallback(mockCallback, 300));

    expect(result.current).toHaveLength(2);
    expect(typeof result.current[0]).toBe("function");
    expect(typeof result.current[1].cancel).toBe("function");
  });

  it("should debounce callback execution", () => {
    const { result } = renderHook(() => useDebounceCallback(mockCallback, 300));

    const [debouncedFn] = result.current;

    // Call the debounced function multiple times
    act(() => {
      debouncedFn("arg1");
      debouncedFn("arg2");
      debouncedFn("arg3");
    });

    // Callback should not be called immediately
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time by less than delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time to complete the delay
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Callback should be called only once with the last arguments
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith("arg3");
  });

  it("should reset delay on subsequent calls", () => {
    const { result } = renderHook(() => useDebounceCallback(mockCallback, 300));

    const [debouncedFn] = result.current;

    // First call
    act(() => {
      debouncedFn("first");
    });

    // Advance time partially
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Second call should reset the timer
    act(() => {
      debouncedFn("second");
    });

    // Advance time by the remaining original delay
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Callback should not be called yet
    expect(mockCallback).not.toHaveBeenCalled();

    // Advance time to complete the new delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith("second");
  });

  it("should handle multiple arguments", () => {
    const { result } = renderHook(() => useDebounceCallback(mockCallback, 300));

    const [debouncedFn] = result.current;

    act(() => {
      debouncedFn("arg1", "arg2", 123, { key: "value" });
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockCallback).toHaveBeenCalledWith("arg1", "arg2", 123, {
      key: "value",
    });
  });

  it("should cancel pending execution", () => {
    const { result } = renderHook(() => useDebounceCallback(mockCallback, 300));

    const [debouncedFn, { cancel }] = result.current;

    act(() => {
      debouncedFn("test");
    });

    // Cancel before delay completes
    act(() => {
      cancel();
    });

    // Advance time past the delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should allow calling after cancellation", () => {
    const { result } = renderHook(() => useDebounceCallback(mockCallback, 300));

    const [debouncedFn, { cancel }] = result.current;

    // Call and cancel
    act(() => {
      debouncedFn("first");
      cancel();
    });

    // Call again after cancellation
    act(() => {
      debouncedFn("second");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith("second");
  });

  it("should update callback when it changes", () => {
    const newCallback = vi.fn();
    const { result, rerender } = renderHook(
      ({ callback }) => useDebounceCallback(callback, 300),
      { initialProps: { callback: mockCallback } }
    );

    const [debouncedFn] = result.current;

    // Call with original callback
    act(() => {
      debouncedFn("test");
    });

    // Change callback before delay completes
    rerender({ callback: newCallback });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // New callback should be called
    expect(mockCallback).not.toHaveBeenCalled();
    expect(newCallback).toHaveBeenCalledWith("test");
  });

  it("should update delay when it changes", () => {
    const { result, rerender } = renderHook(
      ({ delay }) => useDebounceCallback(mockCallback, delay),
      { initialProps: { delay: 300 } }
    );

    let [debouncedFn] = result.current;

    // Call with original delay
    act(() => {
      debouncedFn("test");
    });

    // Change delay
    rerender({ delay: 500 });
    [debouncedFn] = result.current;

    // Call again with new delay
    act(() => {
      debouncedFn("updated");
    });

    // Original delay should not trigger
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(mockCallback).not.toHaveBeenCalled();

    // New delay should trigger
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(mockCallback).toHaveBeenCalledWith("updated");
  });

  it("should handle zero delay", () => {
    const { result } = renderHook(() => useDebounceCallback(mockCallback, 0));

    const [debouncedFn] = result.current;

    act(() => {
      debouncedFn("immediate");
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(mockCallback).toHaveBeenCalledWith("immediate");
  });

  it("should cleanup timeout on unmount", () => {
    const { result, unmount } = renderHook(() =>
      useDebounceCallback(mockCallback, 300)
    );

    const [debouncedFn] = result.current;

    act(() => {
      debouncedFn("test");
    });

    // Unmount before delay completes
    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should handle no arguments", () => {
    const noArgsCallback = vi.fn();
    const { result } = renderHook(() =>
      useDebounceCallback(noArgsCallback, 300)
    );

    const [debouncedFn] = result.current;

    act(() => {
      debouncedFn();
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(noArgsCallback).toHaveBeenCalledWith();
  });

  it("should maintain stable function references", () => {
    const { result, rerender } = renderHook(() =>
      useDebounceCallback(mockCallback, 300)
    );

    const [initialDebouncedFn, initialHandlers] = result.current;

    rerender();

    const [newDebouncedFn, newHandlers] = result.current;

    expect(newDebouncedFn).toBe(initialDebouncedFn);
    expect(newHandlers.cancel).toBe(initialHandlers.cancel);
  });
});
