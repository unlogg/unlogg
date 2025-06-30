import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useIsOnline } from "../use-is-online.js";

// Mock console to avoid noise in tests
const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

describe("useIsOnline", () => {
  let mockNavigator: any;
  let mockWindow: any;
  let originalNavigator: any;
  let originalWindow: any;

  beforeEach(() => {
    // Store originals
    originalNavigator = global.navigator;
    originalWindow = global.window;

    // Create mock navigator
    mockNavigator = {
      onLine: true,
      connection: undefined,
      mozConnection: undefined,
      webkitConnection: undefined,
    };

    // Create mock window with event listener methods
    mockWindow = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    // Replace globals
    Object.defineProperty(global, "navigator", {
      value: mockNavigator,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(global, "window", {
      value: mockWindow,
      writable: true,
      configurable: true,
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore originals
    Object.defineProperty(global, "navigator", {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(global, "window", {
      value: originalWindow,
      writable: true,
      configurable: true,
    });

    vi.clearAllMocks();
  });

  it("should return initial online status", () => {
    mockNavigator.onLine = true;
    const { result } = renderHook(() => useIsOnline());

    expect(result.current.isOnline).toBe(true);
    expect(result.current.networkInfo).toBeUndefined();
  });

  it("should return offline status when navigator.onLine is false", () => {
    mockNavigator.onLine = false;
    const { result } = renderHook(() => useIsOnline());

    expect(result.current.isOnline).toBe(false);
  });

  it("should add event listeners for online/offline events", () => {
    renderHook(() => useIsOnline());

    expect(mockWindow.addEventListener).toHaveBeenCalledWith(
      "online",
      expect.any(Function)
    );
    expect(mockWindow.addEventListener).toHaveBeenCalledWith(
      "offline",
      expect.any(Function)
    );
  });

  it("should update isOnline state when online event is fired", () => {
    mockNavigator.onLine = false;
    const { result } = renderHook(() => useIsOnline());

    expect(result.current.isOnline).toBe(false);

    // Get the online event handler
    const onlineHandler = mockWindow.addEventListener.mock.calls.find(
      (call: any) => call[0] === "online"
    )?.[1];

    act(() => {
      mockNavigator.onLine = true;
      onlineHandler?.();
    });

    expect(result.current.isOnline).toBe(true);
  });

  it("should update isOnline state when offline event is fired", () => {
    mockNavigator.onLine = true;
    const { result } = renderHook(() => useIsOnline());

    expect(result.current.isOnline).toBe(true);

    // Get the offline event handler
    const offlineHandler = mockWindow.addEventListener.mock.calls.find(
      (call: any) => call[0] === "offline"
    )?.[1];

    act(() => {
      mockNavigator.onLine = false;
      offlineHandler?.();
    });

    expect(result.current.isOnline).toBe(false);
  });

  it("should provide network information when navigator.connection is available", () => {
    const mockConnection = {
      downlink: 10,
      downlinkMax: 100,
      effectiveType: "4g" as const,
      rtt: 50,
      saveData: false,
      type: "wifi" as const,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockNavigator.connection = mockConnection;

    const { result } = renderHook(() => useIsOnline());

    expect(result.current.networkInfo).toEqual({
      downlink: 10,
      downlinkMax: 100,
      effectiveType: "4g",
      rtt: 50,
      saveData: false,
      type: "wifi",
    });
  });

  it("should use mozConnection when available", () => {
    const mockConnection = {
      downlink: 5,
      effectiveType: "3g" as const,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockNavigator.mozConnection = mockConnection;

    const { result } = renderHook(() => useIsOnline());

    expect(result.current.networkInfo).toEqual({
      downlink: 5,
      downlinkMax: undefined,
      effectiveType: "3g",
      rtt: undefined,
      saveData: undefined,
      type: undefined,
    });
  });

  it("should use webkitConnection when available", () => {
    const mockConnection = {
      effectiveType: "2g" as const,
      saveData: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockNavigator.webkitConnection = mockConnection;

    const { result } = renderHook(() => useIsOnline());

    expect(result.current.networkInfo).toEqual({
      downlink: undefined,
      downlinkMax: undefined,
      effectiveType: "2g",
      rtt: undefined,
      saveData: true,
      type: undefined,
    });
  });

  it("should prefer navigator.connection over vendor prefixes", () => {
    const standardConnection = {
      effectiveType: "4g" as const,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    const mozConnection = {
      effectiveType: "3g" as const,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockNavigator.connection = standardConnection;
    mockNavigator.mozConnection = mozConnection;

    const { result } = renderHook(() => useIsOnline());

    expect(result.current.networkInfo?.effectiveType).toBe("4g");
  });

  it("should update network info when connection changes", () => {
    const mockConnection = {
      effectiveType: "4g" as any, // Use any to allow mutation
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockNavigator.connection = mockConnection;

    const { result } = renderHook(() => useIsOnline());

    expect(result.current.networkInfo?.effectiveType).toBe("4g");

    // Get the connection change handler
    const changeHandler = mockConnection.addEventListener.mock.calls.find(
      (call: any) => call[0] === "change"
    )?.[1];

    act(() => {
      // Update the connection
      mockConnection.effectiveType = "3g";
      changeHandler?.();
    });

    expect(result.current.networkInfo?.effectiveType).toBe("3g");
  });

  it("should warn when navigator.connection is not supported", () => {
    // No connection property
    renderHook(() => useIsOnline());

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("navigator.connection is not supported")
    );
  });

  it("should clean up event listeners on unmount", () => {
    const { unmount } = renderHook(() => useIsOnline());

    unmount();

    expect(mockWindow.removeEventListener).toHaveBeenCalledWith(
      "online",
      expect.any(Function)
    );
    expect(mockWindow.removeEventListener).toHaveBeenCalledWith(
      "offline",
      expect.any(Function)
    );
  });

  it("should clean up connection event listener on unmount", () => {
    const mockConnection = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockNavigator.connection = mockConnection;

    const { unmount } = renderHook(() => useIsOnline());

    expect(mockConnection.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    unmount();

    expect(mockConnection.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should handle connection with partial information", () => {
    const mockConnection = {
      effectiveType: "4g" as const,
      // Missing other properties
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockNavigator.connection = mockConnection;

    const { result } = renderHook(() => useIsOnline());

    expect(result.current.networkInfo).toEqual({
      downlink: undefined,
      downlinkMax: undefined,
      effectiveType: "4g",
      rtt: undefined,
      saveData: undefined,
      type: undefined,
    });
  });

  it("should handle saveData property", () => {
    const mockConnection = {
      saveData: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockNavigator.connection = mockConnection;

    const { result } = renderHook(() => useIsOnline());

    expect(result.current.networkInfo?.saveData).toBe(true);
  });

  it("should handle all effective types", () => {
    const effectiveTypes = ["slow-2g", "2g", "3g", "4g"] as const;

    effectiveTypes.forEach((effectiveType) => {
      const mockConnection = {
        effectiveType,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockNavigator.connection = mockConnection;

      const { result } = renderHook(() => useIsOnline());

      expect(result.current.networkInfo?.effectiveType).toBe(effectiveType);
    });
  });

  it("should handle all connection types", () => {
    const connectionTypes = [
      "bluetooth",
      "cellular",
      "ethernet",
      "none",
      "wifi",
      "wimax",
      "other",
      "unknown",
    ] as const;

    connectionTypes.forEach((type) => {
      const mockConnection = {
        type,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockNavigator.connection = mockConnection;

      const { result } = renderHook(() => useIsOnline());

      expect(result.current.networkInfo?.type).toBe(type);
    });
  });

  it("should update network info when online/offline events occur", () => {
    const mockConnection = {
      effectiveType: "4g" as any, // Use any to allow mutation
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockNavigator.connection = mockConnection;

    const { result } = renderHook(() => useIsOnline());

    // Get the online event handler
    const onlineHandler = mockWindow.addEventListener.mock.calls.find(
      (call: any) => call[0] === "online"
    )?.[1];

    act(() => {
      // Update the connection info and trigger online event
      mockConnection.effectiveType = "3g";
      onlineHandler?.();
    });

    expect(result.current.networkInfo?.effectiveType).toBe("3g");
  });
});
