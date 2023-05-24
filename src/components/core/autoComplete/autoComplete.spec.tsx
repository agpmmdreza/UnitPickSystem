import {fireEvent, render, screen} from "@testing-library/react";
import AutoComplete from ".";

it("should render auto complete", () => {
  render(<AutoComplete />);

  let autoComplete = screen.getByTestId("test-auto-complete");

  expect(autoComplete).toBeDefined();
});

it("should open menu when clicking on input", () => {
  render(<AutoComplete />);

  let input = screen.getByTestId("test-auto-complete-input");
  fireEvent.focus(input);

  let menu = screen.getByTestId("test-auto-complete-menu");

  expect(menu).toBeDefined();
});

it("should select an item", () => {
  let handlechange = jest.fn();
  render(
    <AutoComplete
      onChange={handlechange}
      options={[
        { key: "k1", value: "OP4" },
        { key: "k2", value: "OP5" },
        { key: "k3", value: "OP6" },
      ]}
    />
  );

  let input = screen.getByTestId("test-auto-complete-input");
  fireEvent.focus(input);

  let op = screen.getByTestId("test-auto-complete-option-k1");
  fireEvent.click(op);

  expect(handlechange).toBeCalledTimes(1);
});

it("should search in options when typing in input", () => {
  let searchText = "OP5";
  render(
    <AutoComplete
      options={[
        { key: "k1", value: "OP4" },
        { key: "k2", value: "OP5" },
        { key: "k3", value: "OP6" },
      ]}
    />
  );

  let input = screen.getByTestId("test-auto-complete-input");
  fireEvent.focus(input);

  fireEvent.change(input, {
    target: { value: searchText },
  });

  let op = screen.getByTestId("test-auto-complete-option-k2");
  expect(op).toBeDefined();
});
