import {fireEvent, render, screen} from "@testing-library/react";
import Checkbox from ".";

it("should render checbox", () => {
  render(<Checkbox checked={false} />);

  let checkbox = screen.getByTestId("test-checkbox");

  expect(checkbox).toBeDefined();
});

it("should click on checkbox", () => {
  let handlechange = jest.fn();

  render(<Checkbox checked={false} onChange={handlechange} />);

  let checkbox = screen.getByTestId("test-checkbox");

  fireEvent.click(checkbox);

  expect(handlechange).toBeCalled();
});
