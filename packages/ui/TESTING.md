# Testing Setup for Unlogg UI Hooks

This document describes the testing setup for the Unlogg UI hooks library.

## Overview

The testing setup uses:

- **Vitest** - Fast unit test framework
- **@testing-library/react** - React testing utilities
- **jsdom** - DOM environment for testing
- **TypeScript** - Full TypeScript support

## Running Tests

```bash
# Run all tests once
pnpm test:run

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests (alias for watch mode)
pnpm test
```

## Test Structure

Tests are located in `src/hooks/unlogg-hooks/__tests__/` directory.

Each hook test file follows the pattern:

- `use-{hook-name}.test.ts`

## Test Examples

### Basic Hook Test

```typescript
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useBoolean } from "../use-boolean.js";

describe("useBoolean", () => {
  it("should initialize with false by default", () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.value).toBe(false);
  });

  it("should toggle value", () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);
  });
});
```

## Mocking

The test setup includes mocks for:

- `localStorage` - For testing storage hooks
- `window.matchMedia` - For testing media query hooks
- `ResizeObserver` - For testing resize-related hooks
- `navigator` - For testing online/offline hooks

## Writing New Tests

When adding tests for new hooks:

1. Create a new test file: `__tests__/use-{hook-name}.test.ts`
2. Import the hook and testing utilities
3. Write tests for:
   - Default behavior
   - All hook options/parameters
   - Edge cases
   - Error handling
   - Function stability (useCallback/useMemo)

## Current Test Coverage

✅ **useBoolean** - 9 tests

- Initialization with default values
- All methods (setTrue, setFalse, toggle)
- Function reference stability
- Error handling

✅ **useCounter** - 17 tests

- Initialization and basic operations
- Min/max constraints
- Custom step values
- Functional updates
- Complex constraint scenarios

✅ **useLocalStorage** - 14 tests

- Basic get/set operations
- Complex data types (objects, arrays)
- Error handling (storage errors, malformed JSON)
- SSR compatibility
- Type safety

## Next Steps

To expand test coverage, add tests for:

- `useClipboardCopy`
- `useDocumentTitle`
- `useHover`
- `useMediaQuery`
- `useWindowSize`
- And all other hooks in the library

Each hook should have comprehensive tests covering all functionality, edge cases, and error scenarios.
