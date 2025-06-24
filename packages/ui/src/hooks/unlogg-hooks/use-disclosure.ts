"use client";

import { useState, useCallback } from "react";

type UseDisclosureOptions = {
  onOpen?: () => void;
  onClose?: () => void;
};

type UseDisclosureHandlers = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

function useDisclosure(
  initialState: boolean = false,
  options: UseDisclosureOptions = {}
): [boolean, UseDisclosureHandlers] {
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => {
    setOpened((prev) => {
      if (!prev) {
        options.onOpen?.();
        return true;
      }
      return prev;
    });
  }, [options.onOpen]);

  const close = useCallback(() => {
    setOpened((prev) => {
      if (prev) {
        options.onClose?.();
        return false;
      }
      return prev;
    });
  }, [options.onClose]);

  const toggle = useCallback(() => {
    setOpened((prev) => {
      if (prev) {
        options.onClose?.();
        return false;
      } else {
        options.onOpen?.();
        return true;
      }
    });
  }, [options.onOpen, options.onClose]);

  return [opened, { open, close, toggle }];
}

export { useDisclosure };
export type { UseDisclosureOptions, UseDisclosureHandlers };
