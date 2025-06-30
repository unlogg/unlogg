import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounceValue } from "../use-debounce-value.js";

describe("useDebounceValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should return initial value and setValue function", () => {
    const { result } = renderHook(() => useDebounceValue("initial", 300));

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toBe("initial");
    expect(typeof result.current[1].setValue).toBe("function");
  });

  it("should debounce value updates", () => {
    const { result } = renderHook(() => useDebounceValue("initial", 300));

    const [, { setValue }] = result.current;

    // Update value multiple times
    act(() => {
      setValue("first");
      setValue("second");
      setValue("third");
    });

    // Value should not change immediately
    expect(result.current[0]).toBe("initial");

    // Fast-forward time by less than delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current[0]).toBe("initial");

    // Fast-forward time to complete the delay
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Value should be updated to the last set value
    expect(result.current[0]).toBe("third");
  });

  it("should reset delay on subsequent value changes", () => {
    const { result } = renderHook(() => useDebounceValue("initial", 300));

    const [, { setValue }] = result.current;

    // First update
    act(() => {
      setValue("first");
    });

    // Advance time partially
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Second update should reset the timer
    act(() => {
      setValue("second");
    });

    // Advance time by the remaining original delay
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Value should still be initial
    expect(result.current[0]).toBe("initial");

    // Advance time to complete the new delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current[0]).toBe("second");
  });

  it("should call onDebounce callback when value is debounced", () => {
    const onDebounce = vi.fn();
    const { result } = renderHook(() =>
      useDebounceValue("initial", 300, { onDebounce })
    );

    const [, { setValue }] = result.current;

    act(() => {
      setValue("debounced");
    });

    expect(onDebounce).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onDebounce).toHaveBeenCalledWith("debounced");
  });

  it("should handle different value types", () => {
    const { result } = renderHook(() => useDebounceValue<number>(0, 300));

    const [, { setValue }] = result.current;

    act(() => {
      setValue(42);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current[0]).toBe(42);
  });

  it("should handle object values", () => {
    const initialObj = { name: "initial" };
    const updatedObj = { name: "updated" };

    const { result } = renderHook(() => useDebounceValue(initialObj, 300));

    const [, { setValue }] = result.current;

    act(() => {
      setValue(updatedObj);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current[0]).toBe(updatedObj);
  });

  it("should update when initialValue changes", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useDebounceValue(initialValue, 300),
      { initialProps: { initialValue: "initial" } }
    );

    expect(result.current[0]).toBe("initial");

    // Change initial value
    act(() => {
      rerender({ initialValue: "changed" });
    });

    expect(result.current[0]).toBe("changed");
  });

  it("should update delay when it changes", () => {
    const { result, rerender } = renderHook(
      ({ delay }) => useDebounceValue("initial", delay),
      { initialProps: { delay: 300 } }
    );

    const [, { setValue }] = result.current;

    act(() => {
      setValue("test");
    });

    // Change delay
    act(() => {
      rerender({ delay: 500 });
    });

    // Original delay should not trigger
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current[0]).toBe("initial");

    // New delay should trigger
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current[0]).toBe("test");
  });

  it("should handle zero delay", () => {
    const { result } = renderHook(() => useDebounceValue("initial", 0));

    const [, { setValue }] = result.current;

    act(() => {
      setValue("immediate");
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current[0]).toBe("immediate");
  });

  it("should cleanup timeout on unmount", () => {
    const onDebounce = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebounceValue("initial", 300, { onDebounce })
    );

    const [, { setValue }] = result.current;

    act(() => {
      setValue("test");
    });

    // Unmount before delay completes
    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // onDebounce should not be called after unmount
    expect(onDebounce).not.toHaveBeenCalled();
  });

  it("should handle rapid successive changes", () => {
    const onDebounce = vi.fn();
    const { result } = renderHook(() =>
      useDebounceValue("initial", 300, { onDebounce })
    );

    const [, { setValue }] = result.current;

    // Rapid changes
    act(() => {
      setValue("a");
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      setValue("b");
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      setValue("c");
    });

    // Complete the delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should only debounce once with the last value
    expect(result.current[0]).toBe("c");
    expect(onDebounce).toHaveBeenCalledTimes(1);
    expect(onDebounce).toHaveBeenCalledWith("c");
  });

  it("should handle onDebounce callback changes", () => {
    const onDebounce1 = vi.fn();
    const onDebounce2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ onDebounce }) => useDebounceValue("initial", 300, { onDebounce }),
      { initialProps: { onDebounce: onDebounce1 } }
    );

    const [, { setValue }] = result.current;

    act(() => {
      setValue("test");
    });

    // Change callback before delay completes
    act(() => {
      rerender({ onDebounce: onDebounce2 });
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // New callback should be called
    expect(onDebounce1).not.toHaveBeenCalled();
    expect(onDebounce2).toHaveBeenCalledWith("test");
  });

  it("should work without onDebounce callback", () => {
    const { result } = renderHook(() => useDebounceValue("initial", 300));

    const [, { setValue }] = result.current;

    act(() => {
      setValue("test");
    });

    // Should not throw when no callback is provided
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current[0]).toBe("test");
  });

  it("should maintain stable setValue reference", () => {
    const { result, rerender } = renderHook(() =>
      useDebounceValue("initial", 300)
    );

    const [, initialHandlers] = result.current;

    act(() => {
      rerender();
    });

    const [, newHandlers] = result.current;

    expect(newHandlers.setValue).toBe(initialHandlers.setValue);
  });
});
