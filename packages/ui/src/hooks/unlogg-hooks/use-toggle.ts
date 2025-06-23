"use client";

import { useReducer } from "react";

type UseToggleAction<T> = (value?: React.SetStateAction<T>) => void;
type UseToggleReturnValue<T> = [T, UseToggleAction<T>];

/**
 * A custom React hook that toggles between values in a given array.
 * Defaults to toggling between `false` and `true`.
 *
 * @template T - The type of the toggle value.
 * @param {readonly T[]} [options=[false, true]] - An array of values to toggle between.
 * @returns {UseToggleReturnValue<T>} - A tuple containing the current value and a function to toggle the value.
 */

function useToggle<T = boolean>(
  options: readonly T[] = [false, true] as any
): UseToggleReturnValue<T> {
  const [[option], toggle] = useReducer(
    (state: T[], action: React.SetStateAction<T>) => {
      const val = action instanceof Function ? action(state[0]) : action;
      const i = Math.abs(state.indexOf(val));

      return state.slice(i).concat(state.slice(0, i));
    },
    options as T[]
  );

  return [option, toggle as UseToggleAction<T>];
}

export { useToggle };
export type { UseToggleReturnValue, UseToggleAction };
