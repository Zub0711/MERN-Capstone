import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

test("snapshot test", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
