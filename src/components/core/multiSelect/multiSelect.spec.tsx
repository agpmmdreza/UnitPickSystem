import {fireEvent, render, screen} from "@testing-library/react";
import MultiSelect from ".";
import {IMenuOption} from "interfaces";

it("should render multi select", () => {
  render(<MultiSelect />);

  let mltiSelect = screen.getByTestId("test-multi-select");

  expect(mltiSelect).toBeDefined();
});

it("should select an item", () => {
  let array: IMenuOption[] = [];
  const options: IMenuOption[] = [
    {
      key: "0",
      value: "Bacteriology laboratory",
      color: "primary-dark",
    },
    {
      key: "1",
      value: "Biochemistry",
      color: "green-light",
    },
    {
      key: "2",
      value: "Haematology laboratory",
      color: "error",
    },
  ];
  render(
    <MultiSelect
      options={options}
      onItemSelect={(val) => {
        array = val;
      }}
    />
  );

  // open menu
  let input = screen.getByTestId("test-input");
  fireEvent.click(input);

  // select item
  let op1 = screen.getByTestId(`test-option-${options[0].key}`);
  fireEvent.click(op1);

  expect(array[0].key).toBe("0");
});

it("should unselect an item", () => {
  let array: IMenuOption[] = [
    {
      key: "0",
      value: "Bacteriology laboratory",
      color: "primary-dark",
    },
  ];
  const options: IMenuOption[] = [
    {
      key: "0",
      value: "Bacteriology laboratory",
      color: "primary-dark",
    },
    {
      key: "1",
      value: "Biochemistry",
      color: "green-light",
    },
    {
      key: "2",
      value: "Haematology laboratory",
      color: "error",
    },
  ];

  render(
    <MultiSelect
      options={options}
      onItemSelect={(val) => {
        array = val;
      }}
      value={array}
    />
  );

  // open menu
  let input = screen.getByTestId("test-input");
  fireEvent.click(input);

  // select item
  let op1 = screen.getByTestId(`test-option-${options[0].key}`);
  fireEvent.click(op1);

  expect(array).toHaveLength(0);
});

it("should filter options when user is typing", () => {
  let searchText = "Bacteriology";
  const options: IMenuOption[] = [
    {
      key: "0",
      value: "Bacteriology laboratory",
      color: "primary-dark",
    },
    {
      key: "1",
      value: "Biochemistry",
      color: "green-light",
    },
    {
      key: "2",
      value: "Haematology laboratory",
      color: "error",
    },
  ];

  render(<MultiSelect options={options} />);

  // open menu
  let input = screen.getByTestId("test-input");
  fireEvent.click(input);

  // search smth
  let searchInput = screen.getByPlaceholderText("Search Department by name");
  fireEvent.focus(searchInput);

  fireEvent.change(searchInput, {
    target: { value: searchText },
  });

  let op = screen.getByTestId("test-option-0");
  expect(op).toBeDefined();
});
