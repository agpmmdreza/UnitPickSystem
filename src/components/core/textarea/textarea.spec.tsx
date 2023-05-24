import {fireEvent, render, screen} from "@testing-library/react";
import Textarea from ".";

it("renders textarea", () => {
  render(<Textarea />);
});

it("renders textarea and changes value", () => {
  let testText = "A test input values";
  let result = "";
  render(
    <Textarea
      onChange={(e) => {
        result = e.target.value;
      }}
    />
  );

  let input = screen.getByTestId("test-textarea");

  expect(input).toBeDefined();

  fireEvent.change(input, {
    target: { value: testText },
  });

  expect(result).toEqual(testText);
});
