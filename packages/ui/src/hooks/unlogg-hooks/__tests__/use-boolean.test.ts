import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useBoolean } from "../use-boolean.js";

describe("useBoolean", () => {
  it("should initialize with false by default", () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current.value).toBe(false);
  });

  it("should initialize with provided default value", () => {
    const { result } = renderHook(() => useBoolean(true));

    expect(result.current.value).toBe(true);
  });

  it("should throw error for non-boolean default value", () => {
    expect(() => {
      renderHook(() => useBoolean("invalid" as any));
    }).toThrow("defaultValue must be `true` or `false`");
  });

  it("should set value to true using setTrue", () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.setTrue();
    });

    expect(result.current.value).toBe(true);
  });

  it("should set value to false using setFalse", () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.value).toBe(false);
  });

  it("should toggle value using toggle", () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(false);
  });

  it("should allow manual setValue", () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.setValue(true);
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setValue((prev: boolean) => !prev);
    });

    expect(result.current.value).toBe(false);
  });

  it("should have stable function references", () => {
    const { result, rerender } = renderHook(() => useBoolean(false));

    const initialSetTrue = result.current.setTrue;
    const initialSetFalse = result.current.setFalse;
    const initialToggle = result.current.toggle;

    rerender();

    expect(result.current.setTrue).toBe(initialSetTrue);
    expect(result.current.setFalse).toBe(initialSetFalse);
    expect(result.current.toggle).toBe(initialToggle);
  });

  it("should return all expected properties", () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current).toHaveProperty("value");
    expect(result.current).toHaveProperty("setValue");
    expect(result.current).toHaveProperty("setTrue");
    expect(result.current).toHaveProperty("setFalse");
    expect(result.current).toHaveProperty("toggle");

    expect(typeof result.current.value).toBe("boolean");
    expect(typeof result.current.setValue).toBe("function");
    expect(typeof result.current.setTrue).toBe("function");
    expect(typeof result.current.setFalse).toBe("function");
    expect(typeof result.current.toggle).toBe("function");
  });
});
