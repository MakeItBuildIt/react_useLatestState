import React, { useEffect, useRef, useState } from "react";

export type GetStateType<T> = () => T;

export type SetStateFunctionalInputType<T> = (value: T) => T;
export type SetStateType<T> = (value: T | SetStateFunctionalInputType<T>) => void;

export const useLatestState = function<T>(initialValue: T): [GetStateType<T>, SetStateType<T>] {
  // Use a reference to store the latest
  // value of the state.
  const valueRef = useRef<T>(initialValue);
  
  const [value, setValue] = useState<T>(initialValue);

  // Whenever the value of state changes,
  // automatically store the latest value
  // inside `valueRef`.
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  /**
   * @returns {T} Latest state value
   */
  function getValue(): T {
    return valueRef.current;
  }

  /**
   * @param {React.SetStateAction<T>} value
   * @returns {void}
   */
  function customSetValue(value: React.SetStateAction<T>): void {
    // If the `value` is a function,
    // call the function by passing latest
    // state value, and obtain the updated
    // state value.
    if (typeof value === "function") {
      const updatedValue: T = (value as Function)(valueRef.current);
      valueRef.current = updatedValue;
      setValue(updatedValue);

      return;
    }

    // If the `value` is supplied
    // directly, simply update the state
    // and store the value in the reference.
    valueRef.current = value;
    setValue(value);
  }

  return [getValue, customSetValue];
}
