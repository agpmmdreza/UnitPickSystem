import PopupAlert from ".";
import {fireEvent, render, screen} from "@testing-library/react";

it("should open popup", () => {
  render(<PopupAlert open onClose={() => {}} />);

  let popup = screen.getByTestId("test-alert-box");

  expect(popup).toBeDefined();
});

it("should close when clicking on close button", () => {
  let handleClose = jest.fn();

  render(<PopupAlert open onClose={handleClose} />);

  let close = screen.getByTestId("test-alert-close");

  fireEvent.click(close);

  expect(handleClose).toBeCalledTimes(1);
});

it("should call approve handler when confirm", () => {
  let handleClose = jest.fn();
  let handleApprove = jest.fn();

  render(<PopupAlert open onClose={handleClose} onApprove={handleApprove} />);

  let approveBtn = screen.getByText("Approve");

  fireEvent.click(approveBtn);

  expect(handleApprove).toBeCalledTimes(1);
});
