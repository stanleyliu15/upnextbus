import { objectToQueryParameters, parseBoolean, arrayify } from "../src/utils/utils";

describe("objectToQueryParameters", () => {
  test("converts an object to query parameters", () => {
    expect(objectToQueryParameters({ a: 1, b: 2, c: 3 })).toBe("a=1&b=2&c=3");
  });
});

describe("parseBoolean", () => {
  test("parses numbers to false", () => {
    expect(parseBoolean("1")).toBe(false);
  });
  test("parses true as true", () => {
    expect(parseBoolean("true")).toBe(true);
  });
});

describe("arrayify", () => {
  test("transforms a random input to be an array", () => {
    const set = new Set([null, undefined, true, 1.23, "", {}]);

    set.forEach(value => {
      expect(Array.isArray(arrayify(value))).toBe(true);
    });
  });

  test("returns the same array", () => {
    const arr = [];
    expect(arrayify(arr)).toBe(arr);
  });
});
