/* eslint-disable testing-library/prefer-presence-queries */
import Button from ".";
import {render, screen} from "@testing-library/react";
import {AddSquareLinear} from "components/icon/addSquare";

it("renders button with default props", () => {
  render(<Button>A Button</Button>);
  expect(screen.queryByTestId("test-button")).toBeDefined();
});

it("renders button with related icon", () => {
  render(<Button icon={AddSquareLinear}>A Button</Button>);
  expect(screen.queryByTestId("test-button-icon")).toBeDefined();
});
