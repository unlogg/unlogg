import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useCounter } from "../use-counter.js";

describe("useCounter", () => {
  it("should initialize with default value of 0", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  it("should initialize with provided initial value", () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });

  it("should increment by default step of 1", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should decrement by default step of 1", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it("should increment by custom step", () => {
    const { result } = renderHook(() => useCounter(0, { step: 5 }));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(5);
  });

  it("should decrement by custom step", () => {
    const { result } = renderHook(() => useCounter(10, { step: 3 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(7);
  });

  it("should reset to initial value", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(12);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  it("should respect minimum value constraint", () => {
    const { result } = renderHook(() => useCounter(5, { min: 0 }));

    act(() => {
      result.current.setCount(-5);
    });

    expect(result.current.count).toBe(0);
  });

  it("should respect maximum value constraint", () => {
    const { result } = renderHook(() => useCounter(5, { max: 10 }));

    act(() => {
      result.current.setCount(15);
    });

    expect(result.current.count).toBe(10);
  });

  it("should clamp initial value within bounds", () => {
    const { result } = renderHook(() => useCounter(15, { min: 0, max: 10 }));

    expect(result.current.count).toBe(10);
  });

  it("should prevent increment beyond maximum", () => {
    const { result } = renderHook(() => useCounter(9, { max: 10 }));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(10);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(10); // Should stay at max
  });

  it("should prevent decrement below minimum", () => {
    const { result } = renderHook(() => useCounter(1, { min: 0 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0); // Should stay at min
  });

  it("should handle functional setCount", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.setCount((prev: number) => prev * 2);
    });

    expect(result.current.count).toBe(10);
  });

  it("should clamp functional setCount result", () => {
    const { result } = renderHook(() => useCounter(5, { min: 0, max: 10 }));

    act(() => {
      result.current.setCount((prev: number) => prev + 20);
    });

    expect(result.current.count).toBe(10); // Should be clamped to max
  });

  it("should have stable function references", () => {
    const { result, rerender } = renderHook(() => useCounter(0));

    const initialIncrement = result.current.increment;
    const initialDecrement = result.current.decrement;
    const initialReset = result.current.reset;
    const initialSetCount = result.current.setCount;

    rerender();

    expect(result.current.increment).toBe(initialIncrement);
    expect(result.current.decrement).toBe(initialDecrement);
    expect(result.current.reset).toBe(initialReset);
    expect(result.current.setCount).toBe(initialSetCount);
  });

  it("should return all expected properties", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current).toHaveProperty("count");
    expect(result.current).toHaveProperty("setCount");
    expect(result.current).toHaveProperty("increment");
    expect(result.current).toHaveProperty("decrement");
    expect(result.current).toHaveProperty("reset");

    expect(typeof result.current.count).toBe("number");
    expect(typeof result.current.setCount).toBe("function");
    expect(typeof result.current.increment).toBe("function");
    expect(typeof result.current.decrement).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("should work with complex constraints", () => {
    const { result } = renderHook(() =>
      useCounter(0, { min: -5, max: 15, step: 2 })
    );

    expect(result.current.count).toBe(0);

    // Test increment with step
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(2);

    // Test decrement with step
    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
    });

    expect(result.current.count).toBe(-4);

    // Try to go below min
    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-5); // Should be clamped to min

    // Reset and try max
    act(() => {
      result.current.setCount(14);
      result.current.increment();
    });

    expect(result.current.count).toBe(15); // Should be clamped to max
  });
});
