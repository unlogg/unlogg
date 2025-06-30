import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDocumentTitle } from "../use-document-title.js";

describe("useDocumentTitle", () => {
  let originalTitle: string;

  beforeEach(() => {
    // Store the original document title
    originalTitle = document.title;
    // Reset to a known state
    document.title = "Original Title";
  });

  afterEach(() => {
    // Restore the original title after each test
    document.title = originalTitle;
  });

  it("should set document title", () => {
    renderHook(() => useDocumentTitle("Test Title"));

    expect(document.title).toBe("Test Title");
  });

  it("should update document title when title changes", () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: "Initial Title" },
    });

    expect(document.title).toBe("Initial Title");

    rerender({ title: "Updated Title" });

    expect(document.title).toBe("Updated Title");
  });

  it("should not change title when title is null", () => {
    document.title = "Existing Title";

    renderHook(() => useDocumentTitle(null));

    expect(document.title).toBe("Existing Title");
  });

  it("should not change title when title is undefined", () => {
    document.title = "Existing Title";

    renderHook(() => useDocumentTitle(undefined));

    expect(document.title).toBe("Existing Title");
  });

  it("should restore original title on unmount when restoreOnUnmount is true", () => {
    const { unmount } = renderHook(() =>
      useDocumentTitle("Test Title", { restoreOnUnmount: true })
    );

    expect(document.title).toBe("Test Title");

    unmount();

    expect(document.title).toBe("Original Title");
  });

  it("should not restore original title on unmount when restoreOnUnmount is false", () => {
    const { unmount } = renderHook(() =>
      useDocumentTitle("Test Title", { restoreOnUnmount: false })
    );

    expect(document.title).toBe("Test Title");

    unmount();

    expect(document.title).toBe("Test Title");
  });

  it("should not restore original title on unmount by default", () => {
    const { unmount } = renderHook(() => useDocumentTitle("Test Title"));

    expect(document.title).toBe("Test Title");

    unmount();

    expect(document.title).toBe("Test Title");
  });

  it("should handle multiple title changes", () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: "Title 1" },
    });

    expect(document.title).toBe("Title 1");

    rerender({ title: "Title 2" });
    expect(document.title).toBe("Title 2");

    rerender({ title: "Title 3" });
    expect(document.title).toBe("Title 3");
  });

  it("should handle changing from valid title to null", () => {
    const { rerender } = renderHook(
      ({ title }: { title: string | null }) => useDocumentTitle(title),
      { initialProps: { title: "Valid Title" as string | null } }
    );

    expect(document.title).toBe("Valid Title");

    rerender({ title: null });

    // Title should remain unchanged when null is passed
    expect(document.title).toBe("Valid Title");
  });

  it("should handle changing from null to valid title", () => {
    const { rerender } = renderHook(
      ({ title }: { title: string | null }) => useDocumentTitle(title),
      { initialProps: { title: null as string | null } }
    );

    // Title should not change when initially null
    expect(document.title).toBe("Original Title");

    rerender({ title: "New Title" });

    expect(document.title).toBe("New Title");
  });

  it("should handle changing restoreOnUnmount option", () => {
    const { rerender, unmount } = renderHook(
      ({ restoreOnUnmount }) =>
        useDocumentTitle("Test Title", { restoreOnUnmount }),
      { initialProps: { restoreOnUnmount: false } }
    );

    expect(document.title).toBe("Test Title");

    // Change restoreOnUnmount to true
    rerender({ restoreOnUnmount: true });

    unmount();

    expect(document.title).toBe("Original Title");
  });

  it("should handle empty string title", () => {
    renderHook(() => useDocumentTitle(""));

    expect(document.title).toBe("");
  });

  it("should handle special characters in title", () => {
    const specialTitle = "Test Title 🚀 & < > \" '";
    renderHook(() => useDocumentTitle(specialTitle));

    expect(document.title).toBe(specialTitle);
  });

  it("should preserve original title across multiple hook instances", () => {
    const { unmount: unmount1 } = renderHook(() =>
      useDocumentTitle("Title 1", { restoreOnUnmount: true })
    );

    expect(document.title).toBe("Title 1");

    const { unmount: unmount2 } = renderHook(() =>
      useDocumentTitle("Title 2", { restoreOnUnmount: true })
    );

    expect(document.title).toBe("Title 2");

    // When the second hook unmounts, it should restore to what it captured (Title 1)
    unmount2();
    expect(document.title).toBe("Title 1");

    // When the first hook unmounts, it should restore to what it captured (Original Title)
    unmount1();
    expect(document.title).toBe("Original Title");
  });

  it("should handle rapid title changes", () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: "Title 1" },
    });

    act(() => {
      rerender({ title: "Title 2" });
      rerender({ title: "Title 3" });
      rerender({ title: "Title 4" });
    });

    expect(document.title).toBe("Title 4");
  });

  it("should work with dynamic titles", () => {
    let counter = 0;
    const { rerender } = renderHook(() => {
      counter++;
      return useDocumentTitle(`Dynamic Title ${counter}`);
    });

    expect(document.title).toBe("Dynamic Title 1");

    rerender();
    expect(document.title).toBe("Dynamic Title 2");

    rerender();
    expect(document.title).toBe("Dynamic Title 3");
  });
});
