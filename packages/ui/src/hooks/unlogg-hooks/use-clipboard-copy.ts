"use client";

import * as React from "react";

interface UseClipboardCopyOptions {
  /**
   * The timeout in milliseconds after which the copied state resets to false.
   * @default 2000
   */
  timeout?: number;
  /**
   * Callback function called when text is successfully copied.
   */
  onSuccess?: (text: string) => void;
  /**
   * Callback function called when copying fails.
   */
  onError?: (error: Error) => void;
}

interface UseClipboardCopyReturn {
  /**
   * Whether text was recently copied (true for the duration of the timeout).
   */
  copied: boolean;
  /**
   * Function to copy text to the clipboard.
   */
  copy: (text: string) => Promise<void>;
  /**
   * The error that occurred during copying, if any.
   */
  error: Error | null;
  /**
   * Function to manually reset the copied state.
   */
  reset: () => void;
}

/**
 * A custom React hook that provides clipboard copy functionality with state management.
 *
 * This hook is useful for:
 * - Copying text to the clipboard with visual feedback
 * - Handling clipboard API errors gracefully
 * - Automatically resetting the copied state after a timeout
 * - Providing user feedback for copy operations
 *
 * @param options - Configuration options for the clipboard copy behavior
 * @returns An object containing the copy function, copied state, error state, and reset function
 *
 * @example
 * function CopyButton() {
 *   const { copy, copied, error } = useClipboardCopy({
 *     timeout: 2000,
 *     onSuccess: (text) => console.log('Copied:', text),
 *     onError: (err) => console.error('Copy failed:', err)
 *   });
 *
 *   const handleCopy = () => {
 *     copy('Hello, World!');
 *   };
 *
 *   return (
 *     <button onClick={handleCopy}>
 *       {copied ? 'Copied!' : 'Copy'}
 *     </button>
 *   );
 * }
 *
 * @example
 * function CodeBlock({ code }: { code: string }) {
 *   const { copy, copied } = useClipboardCopy();
 *
 *   return (
 *     <div>
 *       <pre>{code}</pre>
 *       <button onClick={() => copy(code)}>
 *         {copied ? '✓ Copied' : 'Copy Code'}
 *       </button>
 *     </div>
 *   );
 * }
 */
function useClipboardCopy(
  options: UseClipboardCopyOptions = {}
): UseClipboardCopyReturn {
  const { timeout = 2000, onSuccess, onError } = options;

  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const reset = React.useCallback(() => {
    setCopied(false);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const copy = React.useCallback(
    async (text: string) => {
      try {
        // Clear any existing timeout
        reset();

        // Check if clipboard API is available
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          throw new Error("Clipboard API not supported");
        }

        await navigator.clipboard.writeText(text);

        setCopied(true);
        setError(null);

        // Call success callback if provided
        onSuccess?.(text);

        // Set timeout to reset copied state
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
          timeoutRef.current = null;
        }, timeout);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to copy to clipboard");
        setError(error);
        setCopied(false);

        // Call error callback if provided
        onError?.(error);
      }
    },
    [timeout, onSuccess, onError, reset]
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    copied,
    copy,
    error,
    reset,
  };
}

export { useClipboardCopy };
export type { UseClipboardCopyOptions, UseClipboardCopyReturn };
