/**
 * Converts an object to a query parameters
 * @param {object} o A object to be converted to query parameters
 */
export const objectToQueryParameters = (o: object): string =>
  Object.keys(o)
    .map((key): string => `${key}=${o[key]}`)
    .join("&");

/**
 * Converts a string to a boolean
 * @param {string} s A string to be converted to a boolean
 */
export const parseBoolean = (s: string): boolean => s === "true";

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
