import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useClickOutside } from "../use-click-outside.js";

describe("useClickOutside", () => {
  let mockHandler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockHandler = vi.fn();
  });

  it("should return a ref object", () => {
    const { result } = renderHook(() => useClickOutside(mockHandler));

    expect(result.current).toHaveProperty("current");
    expect(result.current.current).toBeNull();
  });

  it("should call handler when clicking outside the element", () => {
    const { result } = renderHook(() => useClickOutside(mockHandler));

    // Create a mock element and assign it to the ref
    const element = document.createElement("div");
    result.current.current = element;

    // Create a click event outside the element
    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, "target", { value: outsideElement });

    document.dispatchEvent(event);

    expect(mockHandler).toHaveBeenCalledWith(event);

    // Cleanup
    document.body.removeChild(outsideElement);
  });

  it("should not call handler when clicking inside the element", () => {
    const { result } = renderHook(() => useClickOutside(mockHandler));

    // Create a mock element and assign it to the ref
    const element = document.createElement("div");
    const childElement = document.createElement("span");
    element.appendChild(childElement);
    result.current.current = element;

    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, "target", { value: childElement });

    document.dispatchEvent(event);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("should not call handler when clicking on excluded nodes", () => {
    const excludedNode = document.createElement("div");
    const { result } = renderHook(() =>
      useClickOutside(mockHandler, ["mousedown"], [excludedNode])
    );

    // Create a mock element and assign it to the ref
    const element = document.createElement("div");
    result.current.current = element;

    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, "target", { value: excludedNode });

    document.dispatchEvent(event);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("should handle custom events", () => {
    const { result } = renderHook(() =>
      useClickOutside(mockHandler, ["touchstart", "click"])
    );

    // Create a mock element and assign it to the ref
    const element = document.createElement("div");
    result.current.current = element;

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    // Test touchstart event
    const touchEvent = new TouchEvent("touchstart", { bubbles: true });
    Object.defineProperty(touchEvent, "target", { value: outsideElement });

    document.dispatchEvent(touchEvent);

    expect(mockHandler).toHaveBeenCalledWith(touchEvent);

    // Test click event
    mockHandler.mockClear();
    const clickEvent = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(clickEvent, "target", { value: outsideElement });

    document.dispatchEvent(clickEvent);

    expect(mockHandler).toHaveBeenCalledWith(clickEvent);

    // Cleanup
    document.body.removeChild(outsideElement);
  });

  it("should not call handler when ref.current is null", () => {
    const { result } = renderHook(() => useClickOutside(mockHandler));

    // Keep ref.current as null
    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, "target", { value: outsideElement });

    document.dispatchEvent(event);

    expect(mockHandler).not.toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(outsideElement);
  });

  it("should not call handler when event has no target", () => {
    const { result } = renderHook(() => useClickOutside(mockHandler));

    const element = document.createElement("div");
    result.current.current = element;

    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, "target", { value: null });

    document.dispatchEvent(event);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("should handle multiple excluded nodes", () => {
    const excludedNode1 = document.createElement("div");
    const excludedNode2 = document.createElement("span");

    const { result } = renderHook(() =>
      useClickOutside(
        mockHandler,
        ["mousedown"],
        [excludedNode1, excludedNode2]
      )
    );

    const element = document.createElement("div");
    result.current.current = element;

    // Test click on first excluded node
    const event1 = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event1, "target", { value: excludedNode1 });

    document.dispatchEvent(event1);

    expect(mockHandler).not.toHaveBeenCalled();

    // Test click on second excluded node
    const event2 = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event2, "target", { value: excludedNode2 });

    document.dispatchEvent(event2);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("should handle null nodes in excluded nodes array", () => {
    const excludedNode = document.createElement("div");

    const { result } = renderHook(() =>
      useClickOutside(mockHandler, ["mousedown"], [excludedNode, null])
    );

    const element = document.createElement("div");
    result.current.current = element;

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, "target", { value: outsideElement });

    document.dispatchEvent(event);

    expect(mockHandler).toHaveBeenCalledWith(event);

    // Cleanup
    document.body.removeChild(outsideElement);
  });

  it("should cleanup event listeners on unmount", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useClickOutside(mockHandler));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should update event listeners when dependencies change", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { rerender } = renderHook(
      ({ handler, events }) => useClickOutside(handler, events),
      {
        initialProps: {
          handler: mockHandler,
          events: ["mousedown"],
        },
      }
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );

    // Change the events
    const newHandler = vi.fn();
    rerender({ handler: newHandler, events: ["click"] });

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
