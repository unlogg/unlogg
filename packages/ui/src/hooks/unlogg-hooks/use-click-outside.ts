"use client";

import { useEffect, useRef } from "react";

type UseClickOutsideHandler = (event: Event) => void;
type UseClickOutsideEvents = string[];
type UseClickOutsideNodes = (Element | null)[];

/**
 * A custom React hook that detects click and touch events outside of given element or elements group.
 *
 * @param {UseClickOutsideHandler} handler - Function that is called on outside click
 * @param {UseClickOutsideEvents} [events=['mousedown', 'touchstart']] - Optional list of events that trigger outside click
 * @param {UseClickOutsideNodes} [nodes=[]] - Optional list of nodes that should not trigger outside click event
 * @returns {React.RefObject<T>} - A ref object that must be passed to the element based on which outside clicks should be captured
 */

function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: UseClickOutsideHandler,
  events: UseClickOutsideEvents = ["mousedown", "touchstart"],
  nodes: UseClickOutsideNodes = []
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const { target } = event;

      if (!target || !ref.current) {
        return;
      }

      // Check if click is outside the main element
      if (ref.current.contains(target as Node)) {
        return;
      }

      // Check if click is inside any of the excluded nodes
      if (nodes.some((node) => node?.contains(target as Node))) {
        return;
      }

      handler(event);
    };

    events.forEach((event) => {
      document.addEventListener(event, listener);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener);
      });
    };
  }, [handler, events, nodes]);

  return ref;
}

export { useClickOutside };
export type {
  UseClickOutsideHandler,
  UseClickOutsideEvents,
  UseClickOutsideNodes,
};
