import {fireEvent, render, screen} from "@testing-library/react";
import Switch from ".";

it("should render swithc", () => {
  render(<Switch checked={false} />);

  let checkbox = screen.getByTestId("test-switch");

  expect(checkbox).toBeDefined();
});

it("should click on swithc", () => {
  let handlechange = jest.fn();

  render(<Switch checked={false} onChange={handlechange} />);

  let checkbox = screen.getByTestId("test-switch");

  fireEvent.click(checkbox);

  expect(handlechange).toBeCalledTimes(1);
});
