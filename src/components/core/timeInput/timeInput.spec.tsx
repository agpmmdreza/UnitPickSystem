import {fireEvent, render, screen} from "@testing-library/react";
import TimeInput from ".";
import "@testing-library/jest-dom";

it("should render time input", () => {
  render(<TimeInput name="time" onChange={jest.fn()} />);

  let time = screen.getByTestId("test-time");

  expect(time).toBeDefined();
});

it("should change hour and minute", () => {
  render(<TimeInput name="time" onChange={jest.fn()} />);

  let hour = screen.getByTestId("test-time-hour");
  let minute = screen.getByTestId("test-time-minute");

  expect(hour).toHaveValue("09");
  expect(minute).toHaveValue("00");

  fireEvent.change(hour, { target: { value: "12" } });
  fireEvent.change(minute, { target: { value: "44" } });

  expect(hour).toHaveValue("12");
  expect(minute).toHaveValue("44");
});

it("should disable arrow", () => {
  render(<TimeInput name="time" onChange={jest.fn()} />);

  let hour = screen.getByTestId("test-time-hour");
  let minute = screen.getByTestId("test-time-minute");

  let arrowUp = screen.getByTestId("test-arrow-up");
  let arrowDown = screen.getByTestId("test-arrow-down");

  fireEvent.focus(hour);
  fireEvent.change(hour, { target: { value: "12" } });

  expect(arrowUp).toHaveAttribute("data-disabled", "true");
  expect(arrowDown).toHaveAttribute("data-disabled", "false");

  fireEvent.focus(minute);
  fireEvent.change(minute, { target: { value: "00" } });

  expect(arrowUp).toHaveAttribute("data-disabled", "false");
  expect(arrowDown).toHaveAttribute("data-disabled", "true");
});
