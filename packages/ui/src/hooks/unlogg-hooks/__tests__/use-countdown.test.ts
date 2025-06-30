import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useCountdown } from "../use-countdown.js";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should initialize with the correct count and inactive state", () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10 }));

    const [count, controls] = result.current;

    expect(count).toBe(10);
    expect(controls.isActive).toBe(false);
    expect(typeof controls.startCountdown).toBe("function");
    expect(typeof controls.stopCountdown).toBe("function");
    expect(typeof controls.resetCountdown).toBe("function");
  });

  it("should start countdown and decrement count", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 1000 })
    );

    // Start countdown
    act(() => {
      result.current[1].startCountdown();
    });

    expect(result.current[1].isActive).toBe(true);
    expect(result.current[0]).toBe(5);

    // Advance time by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(4);

    // Advance time by another second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(3);
  });

  it("should stop countdown when stopCountdown is called", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 1000 })
    );

    // Start countdown
    act(() => {
      result.current[1].startCountdown();
    });

    expect(result.current[1].isActive).toBe(true);

    // Advance time
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(4);

    // Stop countdown
    act(() => {
      result.current[1].stopCountdown();
    });

    expect(result.current[1].isActive).toBe(false);

    // Advance time - count should not change
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current[0]).toBe(4);
  });

  it("should reset countdown to initial value", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 1000 })
    );

    // Start countdown and let it run
    act(() => {
      result.current[1].startCountdown();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current[0]).toBe(3);
    expect(result.current[1].isActive).toBe(true);

    // Reset countdown
    act(() => {
      result.current[1].resetCountdown();
    });

    expect(result.current[0]).toBe(5);
    expect(result.current[1].isActive).toBe(false);
  });

  it("should automatically stop and call onComplete when reaching zero", () => {
    const onComplete = vi.fn();

    const { result } = renderHook(() =>
      useCountdown({ countStart: 2, intervalMs: 1000, onComplete })
    );

    // Start countdown
    act(() => {
      result.current[1].startCountdown();
    });

    expect(result.current[0]).toBe(2);
    expect(result.current[1].isActive).toBe(true);

    // Advance to 1
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(1);
    expect(result.current[1].isActive).toBe(true);
    expect(onComplete).not.toHaveBeenCalled();

    // Advance to 0
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(0);
    expect(result.current[1].isActive).toBe(false);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("should not start countdown if count is zero", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 0, intervalMs: 1000 })
    );

    // Try to start countdown
    act(() => {
      result.current[1].startCountdown();
    });

    expect(result.current[1].isActive).toBe(false);
    expect(result.current[0]).toBe(0);
  });

  it("should use custom interval", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 3, intervalMs: 500 })
    );

    // Start countdown
    act(() => {
      result.current[1].startCountdown();
    });

    expect(result.current[0]).toBe(3);

    // Advance by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBe(2);

    // Advance by another 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBe(1);
  });

  it("should handle multiple start/stop cycles", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 1000 })
    );

    // First cycle
    act(() => {
      result.current[1].startCountdown();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current[0]).toBe(3);

    act(() => {
      result.current[1].stopCountdown();
    });

    // Second cycle
    act(() => {
      result.current[1].startCountdown();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(2);
    expect(result.current[1].isActive).toBe(true);
  });

  it("should cleanup interval on unmount", () => {
    const { result, unmount } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 1000 })
    );

    // Start countdown
    act(() => {
      result.current[1].startCountdown();
    });

    expect(result.current[1].isActive).toBe(true);

    // Unmount the hook
    unmount();

    // Advance time - should not cause errors
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Test passes if no errors thrown
    expect(true).toBe(true);
  });

  it("should update interval when intervalMs changes", () => {
    const { result, rerender } = renderHook(
      ({ intervalMs }) => useCountdown({ countStart: 5, intervalMs }),
      { initialProps: { intervalMs: 1000 } }
    );

    // Start countdown with 1000ms interval
    act(() => {
      result.current[1].startCountdown();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(4);

    // Change interval to 500ms
    rerender({ intervalMs: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBe(3);
  });

  it("should update onComplete callback when it changes", () => {
    const onComplete1 = vi.fn();
    const onComplete2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ onComplete }) =>
        useCountdown({ countStart: 1, intervalMs: 1000, onComplete }),
      { initialProps: { onComplete: onComplete1 } }
    );

    // Start countdown
    act(() => {
      result.current[1].startCountdown();
    });

    // Change callback before countdown finishes
    rerender({ onComplete: onComplete2 });

    // Let countdown finish
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onComplete1).not.toHaveBeenCalled();
    expect(onComplete2).toHaveBeenCalledTimes(1);
  });

  it("should handle countStart changes correctly", () => {
    const { result, rerender } = renderHook(
      ({ countStart }) => useCountdown({ countStart, intervalMs: 1000 }),
      { initialProps: { countStart: 5 } }
    );

    expect(result.current[0]).toBe(5);

    // Reset should use new countStart value
    rerender({ countStart: 10 });

    act(() => {
      result.current[1].resetCountdown();
    });

    expect(result.current[0]).toBe(10);
  });

  it("should have stable function references", () => {
    const { result, rerender } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 1000 })
    );

    const initialControls = result.current[1];

    rerender();

    expect(result.current[1].startCountdown).toBe(
      initialControls.startCountdown
    );
    expect(result.current[1].stopCountdown).toBe(initialControls.stopCountdown);
    expect(result.current[1].resetCountdown).toBe(
      initialControls.resetCountdown
    );
  });

  it("should not start if already at zero after reset", () => {
    const { result, rerender } = renderHook(
      ({ countStart }) => useCountdown({ countStart, intervalMs: 1000 }),
      { initialProps: { countStart: 2 } }
    );

    // Start and let it finish
    act(() => {
      result.current[1].startCountdown();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current[0]).toBe(0);
    expect(result.current[1].isActive).toBe(false);

    // Try to start again at zero
    act(() => {
      result.current[1].startCountdown();
    });

    expect(result.current[1].isActive).toBe(false);
  });

  it("should handle rapid start/stop operations", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 10, intervalMs: 1000 })
    );

    // Rapid start/stop
    act(() => {
      result.current[1].startCountdown();
      result.current[1].stopCountdown();
      result.current[1].startCountdown();
      result.current[1].stopCountdown();
      result.current[1].startCountdown();
    });

    expect(result.current[1].isActive).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(9);
  });

  it("should return correct tuple structure", () => {
    const { result } = renderHook(() => useCountdown({ countStart: 5 }));

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current).toHaveLength(2);

    const [count, controls] = result.current;

    expect(typeof count).toBe("number");
    expect(typeof controls).toBe("object");
    expect(controls).toHaveProperty("startCountdown");
    expect(controls).toHaveProperty("stopCountdown");
    expect(controls).toHaveProperty("resetCountdown");
    expect(controls).toHaveProperty("isActive");
  });
});
