import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDisclosure } from "../use-disclosure.js";

describe("useDisclosure", () => {
  it("should initialize with false by default", () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toBe(false);
    expect(typeof result.current[1].open).toBe("function");
    expect(typeof result.current[1].close).toBe("function");
    expect(typeof result.current[1].toggle).toBe("function");
  });

  it("should initialize with provided initial state", () => {
    const { result } = renderHook(() => useDisclosure(true));

    expect(result.current[0]).toBe(true);
  });

  it("should open when open is called", () => {
    const { result } = renderHook(() => useDisclosure(false));

    act(() => {
      result.current[1].open();
    });

    expect(result.current[0]).toBe(true);
  });

  it("should close when close is called", () => {
    const { result } = renderHook(() => useDisclosure(true));

    act(() => {
      result.current[1].close();
    });

    expect(result.current[0]).toBe(false);
  });

  it("should toggle state when toggle is called", () => {
    const { result } = renderHook(() => useDisclosure(false));

    // Toggle from false to true
    act(() => {
      result.current[1].toggle();
    });

    expect(result.current[0]).toBe(true);

    // Toggle from true to false
    act(() => {
      result.current[1].toggle();
    });

    expect(result.current[0]).toBe(false);
  });

  it("should call onOpen callback when opening", () => {
    const onOpen = vi.fn();
    const { result } = renderHook(() => useDisclosure(false, { onOpen }));

    act(() => {
      result.current[1].open();
    });

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("should call onClose callback when closing", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useDisclosure(true, { onClose }));

    act(() => {
      result.current[1].close();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call appropriate callbacks when toggling", () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { result } = renderHook(() =>
      useDisclosure(false, { onOpen, onClose })
    );

    // Toggle from false to true
    act(() => {
      result.current[1].toggle();
    });

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();

    // Toggle from true to false
    act(() => {
      result.current[1].toggle();
    });

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onOpen if already opened", () => {
    const onOpen = vi.fn();
    const { result } = renderHook(() => useDisclosure(true, { onOpen }));

    act(() => {
      result.current[1].open();
    });

    expect(onOpen).not.toHaveBeenCalled();
    expect(result.current[0]).toBe(true);
  });

  it("should not call onClose if already closed", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useDisclosure(false, { onClose }));

    act(() => {
      result.current[1].close();
    });

    expect(onClose).not.toHaveBeenCalled();
    expect(result.current[0]).toBe(false);
  });

  it("should handle multiple open calls", () => {
    const onOpen = vi.fn();
    const { result } = renderHook(() => useDisclosure(false, { onOpen }));

    act(() => {
      result.current[1].open();
      result.current[1].open();
      result.current[1].open();
    });

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(true);
  });

  it("should handle multiple close calls", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useDisclosure(true, { onClose }));

    act(() => {
      result.current[1].close();
      result.current[1].close();
      result.current[1].close();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(false);
  });

  it("should work without callbacks", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current[1].open();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1].close();
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1].toggle();
    });

    expect(result.current[0]).toBe(true);
  });

  it("should maintain stable function references", () => {
    const { result, rerender } = renderHook(() => useDisclosure(false));

    const [, initialHandlers] = result.current;

    rerender();

    const [, newHandlers] = result.current;

    expect(newHandlers.open).toBe(initialHandlers.open);
    expect(newHandlers.close).toBe(initialHandlers.close);
    expect(newHandlers.toggle).toBe(initialHandlers.toggle);
  });

  it("should update callbacks when options change", () => {
    const onOpen1 = vi.fn();
    const onOpen2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ onOpen }) => useDisclosure(false, { onOpen }),
      { initialProps: { onOpen: onOpen1 } }
    );

    // Change callback
    rerender({ onOpen: onOpen2 });

    act(() => {
      result.current[1].open();
    });

    // New callback should be used
    expect(onOpen1).not.toHaveBeenCalled();
    expect(onOpen2).toHaveBeenCalledTimes(1);
  });

  it("should handle complex state sequences", () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { result } = renderHook(() =>
      useDisclosure(false, { onOpen, onClose })
    );

    // Start closed, open, close, toggle, toggle
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1].open();
    });
    expect(result.current[0]).toBe(true);
    expect(onOpen).toHaveBeenCalledTimes(1);

    act(() => {
      result.current[1].close();
    });
    expect(result.current[0]).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);

    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(true);
    expect(onOpen).toHaveBeenCalledTimes(2);

    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("should handle edge case with null/undefined callbacks", () => {
    const { result } = renderHook(() =>
      useDisclosure(false, { onOpen: undefined, onClose: null as any })
    );

    // Should not throw
    act(() => {
      result.current[1].open();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1].close();
    });

    expect(result.current[0]).toBe(false);
  });

  it("should work with different initial state values", () => {
    const { result: resultTrue } = renderHook(() => useDisclosure(true));
    const { result: resultFalse } = renderHook(() => useDisclosure(false));

    expect(resultTrue.current[0]).toBe(true);
    expect(resultFalse.current[0]).toBe(false);
  });
});
