import isNil from "lodash/isNil";
import startCase from "lodash/startCase";
import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Converts an object to a query parameters
 * @param {object} o A object to be converted to query parameters
 */
export const objectToQueryParameters = (o: object): string =>
  Object.keys(o)
    .map((key): string => `${key}=${o[key]}`)
    .join("&");

/**
 * Converts the input as an array with itself as the only element
 * If the input is already an array, returns itself
 * @param {any} input - A input to be converted to an array
 */
export const arrayify = (input: any): any[] => {
  if (Array.isArray(input)) {
    return input;
  }

  return [input];
};

/**
 * Converts a string to a boolean
 * @param {string} s A string to be converted to a boolean
 */
export const parseBoolean = (s: string): boolean => s === "true";

export const titleCase = (s: string) => (isNil(s) ? s : startCase(s.toLowerCase()));

export const removeExtraWhitespace = (s: string) => s.replace(/\s+/g, " ").trim();

export const normalizeRouteName = (s: string): string => s.replace(/_/g, " ").replace(/-/g, " - ");

export function useToggle(initialState: boolean = false) {
  const [toggled, setToggled] = useState(initialState);
  const toggle = useCallback(() => setToggled(value => !value), []);

  return [toggled, toggle] as const; // use of `as const` for correct type inference
}

export const enumKeyFromValue = (enumParam, enumValue) => {
  return Object.keys(enumParam).find(key => enumParam[key] === enumValue);
};

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  function start() {
    setActive(true);
  }

  function stop() {
    setActive(false);
  }

  function restart() {
    setSeconds(0);
    setActive(true);
  }

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!active) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, seconds]);

  return { seconds, startTimer: start, stopTimer: stop, restartTimer: restart };
};
