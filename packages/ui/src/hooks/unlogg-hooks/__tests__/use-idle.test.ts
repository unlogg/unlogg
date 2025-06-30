import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useIdle } from "../use-idle.js";

describe("useIdle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("should return initial state as true by default", () => {
    const { result } = renderHook(() => useIdle(1000));
    expect(result.current).toBe(true);
  });

  it("should return custom initial state", () => {
    const { result } = renderHook(() => useIdle(1000, { initialState: false }));
    expect(result.current).toBe(false);
  });

  it("should set idle state to true after timeout", () => {
    const { result } = renderHook(() => useIdle(1000, { initialState: false }));

    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });

  it("should reset idle timer on mouse movement", () => {
    const { result } = renderHook(() => useIdle(1000, { initialState: false }));

    expect(result.current).toBe(false);

    // Advance time partway
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(false);

    // Simulate mouse movement
    act(() => {
      const event = new Event("mousemove");
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(false);

    // Advance time by original timeout - should not be idle yet
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(false);

    // Advance time by full timeout from reset - should be idle now
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(true);
  });

  it("should reset idle timer on keyboard activity", () => {
    const { result } = renderHook(() => useIdle(1000, { initialState: false }));

    expect(result.current).toBe(false);

    // Advance time partway
    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(result.current).toBe(false);

    // Simulate keydown
    act(() => {
      const event = new Event("keydown");
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(false);

    // Should not be idle after original timeout
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe(false);
  });

  it("should work with custom events", () => {
    const { result } = renderHook(() =>
      useIdle(1000, {
        initialState: false,
        events: ["click", "scroll"],
      })
    );

    expect(result.current).toBe(false);

    // Advance time partway
    act(() => {
      vi.advanceTimersByTime(800);
    });

    // Mouse movement should not reset timer (not in custom events)
    act(() => {
      const event = new Event("mousemove");
      document.dispatchEvent(event);
    });

    // Should become idle after original timeout
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe(true);

    // Click should reset timer
    act(() => {
      const event = new Event("click");
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(false);
  });

  it("should handle multiple rapid events correctly", () => {
    const { result } = renderHook(() => useIdle(1000, { initialState: false }));

    expect(result.current).toBe(false);

    // Simulate rapid events
    act(() => {
      vi.advanceTimersByTime(300);
      const event1 = new Event("mousemove");
      document.dispatchEvent(event1);

      vi.advanceTimersByTime(300);
      const event2 = new Event("keydown");
      document.dispatchEvent(event2);

      vi.advanceTimersByTime(300);
      const event3 = new Event("click");
      document.dispatchEvent(event3);
    });

    expect(result.current).toBe(false);

    // Should become idle only after full timeout from last event
    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe(true);
  });

  it("should clean up event listeners on unmount", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useIdle(1000));

    // Should have added event listeners
    expect(addEventListenerSpy).toHaveBeenCalledTimes(6); // Default events

    unmount();

    // Should have removed event listeners
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(6);

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should clear timeout on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");

    const { unmount } = renderHook(() => useIdle(1000));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });

  it("should handle timeout changes", () => {
    const { result, rerender } = renderHook(
      ({ timeout }) => useIdle(timeout, { initialState: false }),
      { initialProps: { timeout: 1000 } }
    );

    expect(result.current).toBe(false);

    // Change timeout
    rerender({ timeout: 2000 });

    // Should respect new timeout
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });

  it("should handle all default events", () => {
    const { result } = renderHook(() => useIdle(1000, { initialState: false }));

    const defaultEvents = [
      "keydown",
      "click",
      "scroll",
      "wheel",
      "mousemove",
      "touchmove",
    ];

    defaultEvents.forEach((eventType) => {
      // Set to idle first
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current).toBe(true);

      // Trigger event and verify it resets idle state
      act(() => {
        const event = new Event(eventType);
        document.dispatchEvent(event);
      });
      expect(result.current).toBe(false);
    });
  });

  it("should start timer immediately on mount", () => {
    const { result } = renderHook(() => useIdle(1000, { initialState: false }));

    expect(result.current).toBe(false);

    // Should become idle after the specified timeout
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });

  it("should work with zero timeout", () => {
    const { result } = renderHook(() => useIdle(0, { initialState: false }));

    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current).toBe(true);
  });

  it("should handle empty events array", () => {
    const { result } = renderHook(() =>
      useIdle(1000, {
        initialState: false,
        events: [],
      })
    );

    expect(result.current).toBe(false);

    // No events should reset the timer
    act(() => {
      const event = new Event("mousemove");
      document.dispatchEvent(event);
    });

    // Should still become idle after timeout
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });
});
