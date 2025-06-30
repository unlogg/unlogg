import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useHover } from "../use-hover.js";
import { createRef } from "react";

describe("useHover", () => {
  let mockElement: HTMLDivElement;
  let elementRef: React.RefObject<HTMLDivElement | null>;

  beforeEach(() => {
    mockElement = document.createElement("div");
    elementRef = createRef<HTMLDivElement | null>();
    // Manually set the ref current to our mock element
    (elementRef as any).current = mockElement;
  });

  it("should return false initially", () => {
    const { result } = renderHook(() => useHover(elementRef));

    expect(result.current).toBe(false);
  });

  it("should return true when mouse enters element", () => {
    const { result, rerender } = renderHook(() => useHover(elementRef));

    expect(result.current).toBe(false);

    // Force the effect to run to attach event listeners
    rerender();

    // Simulate mouse enter
    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      mockElement.dispatchEvent(event);
    });

    expect(result.current).toBe(true);
  });

  it("should return false when mouse leaves element", () => {
    const { result, rerender } = renderHook(() => useHover(elementRef));

    // Force the effect to run to attach event listeners
    rerender();

    // First, enter the element
    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      mockElement.dispatchEvent(event);
    });

    expect(result.current).toBe(true);

    // Then leave the element
    act(() => {
      const event = new MouseEvent("mouseleave", { bubbles: true });
      mockElement.dispatchEvent(event);
    });

    expect(result.current).toBe(false);
  });

  it("should handle multiple enter/leave cycles", () => {
    const { result, rerender } = renderHook(() => useHover(elementRef));

    // Force the effect to run to attach event listeners
    rerender();

    // Enter
    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      mockElement.dispatchEvent(event);
    });
    expect(result.current).toBe(true);

    // Leave
    act(() => {
      const event = new MouseEvent("mouseleave", { bubbles: true });
      mockElement.dispatchEvent(event);
    });
    expect(result.current).toBe(false);

    // Enter again
    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      mockElement.dispatchEvent(event);
    });
    expect(result.current).toBe(true);

    // Leave again
    act(() => {
      const event = new MouseEvent("mouseleave", { bubbles: true });
      mockElement.dispatchEvent(event);
    });
    expect(result.current).toBe(false);
  });

  it("should not change state when ref.current is null", () => {
    const nullRef = createRef<HTMLDivElement | null>();
    const { result } = renderHook(() => useHover(nullRef));

    expect(result.current).toBe(false);

    // Try to trigger events on a non-existent element (should not crash)
    expect(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      if (nullRef.current) {
        nullRef.current.dispatchEvent(event);
      }
    }).not.toThrow();

    expect(result.current).toBe(false);
  });

  it("should add and remove event listeners properly", () => {
    const addEventListenerSpy = vi.spyOn(mockElement, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(mockElement, "removeEventListener");

    const { unmount } = renderHook(() => useHover(elementRef));

    // Check that event listeners were added
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mouseenter",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function)
    );

    unmount();

    // Check that event listeners were removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mouseenter",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should handle changing element reference", () => {
    const { result, rerender } = renderHook(() => useHover(elementRef));

    // First element hover
    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      mockElement.dispatchEvent(event);
    });
    expect(result.current).toBe(true);

    // Change to new element
    const newMockElement = document.createElement("div");
    const newElementRef = createRef<HTMLDivElement | null>();
    (newElementRef as any).current = newMockElement;

    // Change the ref by rerendering with new element
    const { result: newResult } = renderHook(() => useHover(newElementRef));

    // New element should start with false
    expect(newResult.current).toBe(false);

    // Hovering new element should work
    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      newMockElement.dispatchEvent(event);
    });
    expect(newResult.current).toBe(true);
  });

  it("should work with different HTML element types", () => {
    const buttonElement = document.createElement("button");
    const buttonRef = createRef<HTMLButtonElement | null>();
    (buttonRef as any).current = buttonElement;

    const { result } = renderHook(() => useHover(buttonRef));

    expect(result.current).toBe(false);

    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      buttonElement.dispatchEvent(event);
    });

    expect(result.current).toBe(true);
  });

  it("should handle rapid hover events", () => {
    const { result } = renderHook(() => useHover(elementRef));

    act(() => {
      // Rapid enter/leave/enter
      const enterEvent = new MouseEvent("mouseenter", { bubbles: true });
      const leaveEvent = new MouseEvent("mouseleave", { bubbles: true });

      mockElement.dispatchEvent(enterEvent);
      mockElement.dispatchEvent(leaveEvent);
      mockElement.dispatchEvent(enterEvent);
    });

    expect(result.current).toBe(true);
  });

  it("should not interfere with other event listeners", () => {
    const externalHandler = vi.fn();
    mockElement.addEventListener("mouseenter", externalHandler);

    const { result } = renderHook(() => useHover(elementRef));

    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      mockElement.dispatchEvent(event);
    });

    expect(result.current).toBe(true);
    expect(externalHandler).toHaveBeenCalledTimes(1);

    mockElement.removeEventListener("mouseenter", externalHandler);
  });

  it("should handle unmounting while hovered", () => {
    const { result, unmount } = renderHook(() => useHover(elementRef));

    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      mockElement.dispatchEvent(event);
    });

    expect(result.current).toBe(true);

    // Unmounting while hovered should not cause issues
    expect(() => unmount()).not.toThrow();
  });

  it("should handle element reference changing to null", () => {
    const { rerender } = renderHook(({ ref }) => useHover(ref), {
      initialProps: { ref: elementRef },
    });

    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      mockElement.dispatchEvent(event);
    });

    const nullRef = createRef<HTMLDivElement | null>();
    rerender({ ref: nullRef });

    // Should not crash when ref becomes null
    expect(() => {
      if (nullRef.current) {
        const event = new MouseEvent("mouseenter", { bubbles: true });
        nullRef.current.dispatchEvent(event);
      }
    }).not.toThrow();
  });

  it("should maintain stable behavior with same ref object", () => {
    const { result, rerender } = renderHook(() => useHover(elementRef));

    act(() => {
      const event = new MouseEvent("mouseenter", { bubbles: true });
      mockElement.dispatchEvent(event);
    });

    expect(result.current).toBe(true);

    // Rerender with same ref should maintain behavior
    rerender();

    act(() => {
      const event = new MouseEvent("mouseleave", { bubbles: true });
      mockElement.dispatchEvent(event);
    });

    expect(result.current).toBe(false);
  });
});
