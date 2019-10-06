/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "react-native-testing-library";

import App from "../App";

describe("<App />", () => {
  const tree = render(<App />).toJSON();

  it("renders without crashing", () => {
    expect(tree).toBeTruthy();
  });

  it("has 1 child", () => {
    expect(tree.children.length).toBe(1);
  });
});
