import {fireEvent, render, screen} from "@testing-library/react";
import {BoxBold} from "components/icon";
import IconButton from ".";
import "@testing-library/jest-dom";

it("should render icon button", () => {
  render(<IconButton icon={BoxBold} />);

  expect(screen.getByTestId("test-icon-button")).toBeInTheDocument();
});

it("should click icon button", () => {
  let handleClick = jest.fn();
  render(<IconButton icon={BoxBold} onClick={handleClick} />);

  let iconButton = screen.getByTestId("test-icon-button");

  fireEvent.click(iconButton);

  expect(handleClick).toBeCalledTimes(1);
});
