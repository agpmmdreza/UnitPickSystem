import PopupBase from ".";
import {fireEvent, render, screen} from "@testing-library/react";

it("should open popup", () => {
  let title = "test title";
  let testText = "test text";
  render(<PopupBase open title={title} text={testText} />);

  let popup = screen.getByTestId("test-alert-box");

  expect(popup).toBeDefined();
  expect(title).toBeDefined();
  expect(testText).toBeDefined();
});

it("should close when clicking on close button", () => {
  let handleClose = jest.fn();

  render(
    <PopupBase open title="test title" text="test text" onClose={handleClose} />
  );

  let close = screen.getByTestId("test-alert-close");

  fireEvent.click(close);

  expect(handleClose).toBeCalledTimes(1);
});
