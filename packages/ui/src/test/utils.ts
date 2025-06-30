/**
 * Test utilities for Unlogg UI hooks
 */
import { vi, expect } from "vitest";

/**
 * Mock localStorage for testing
 */
export const createMockLocalStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
    get store() {
      return { ...store };
    },
  };
};

/**
 * Mock window.matchMedia for testing
 */
export const createMockMatchMedia = (matches = false) =>
  vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

/**
 * Mock ResizeObserver for testing
 */
export class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

/**
 * Mock navigator for testing
 */
export const createMockNavigator = (overrides: Partial<Navigator> = {}) => ({
  onLine: true,
  connection: undefined,
  userAgent: "vitest",
  ...overrides,
});

/**
 * Test helper to simulate user events with delays
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Test helper to assert function reference stability
 */
export const assertStableReferences = (
  result: { current: Record<string, any> },
  rerender: () => void,
  functionNames: string[]
) => {
  const initialRefs = functionNames.reduce(
    (acc, name) => {
      acc[name] = result.current[name];
      return acc;
    },
    {} as Record<string, any>
  );

  rerender();

  functionNames.forEach((name) => {
    expect(result.current[name]).toBe(initialRefs[name]);
  });
};

/**
 * Test helper to mock console methods and restore them
 */
export const withMockedConsole = <T>(
  method: "log" | "warn" | "error",
  fn: (spy: ReturnType<typeof vi.spyOn>) => T
): T => {
  const spy = vi.spyOn(console, method).mockImplementation(() => {});
  try {
    return fn(spy);
  } finally {
    spy.mockRestore();
  }
};
