import {fireEvent, render, screen} from "@testing-library/react";
import Filter, {IFilter} from ".";

const OPTIONS = [
  {
    title: "Healthcare Facility Type",
    filters: [
      { key: "0", value: "All" },
      { key: "1", value: "Hospital " },
      { key: "2", value: "Clinic" },
      { key: "3", value: "Home Office" },
    ],
  },
];

it("should render filter component", () => {
  render(<Filter value={[]} options={[]} />);

  let filter = screen.getByTestId("test-filter");

  expect(filter).toBeDefined();
});

it("should open menu when clicking on input", () => {
  render(<Filter options={OPTIONS} value={[]} />);

  let btn = screen.getByTestId("test-button");
  // open menu
  fireEvent.click(btn);

  let menu = screen.getByTestId("test-filter-menu");

  expect(menu.getAttribute("data-open")).toBe("true");
});

it("should not show the menu when closed", () => {
  render(<Filter options={OPTIONS} value={[]} />);

  // open menu
  let btn = screen.getByTestId("test-button");
  fireEvent.click(btn);

  // close menu
  fireEvent.click(btn);

  let menu = screen.getByTestId("test-filter-menu");

  expect(menu.getAttribute("data-open")).toBe("false");
});

it("should select one filter correctly", () => {
  let handlechange = jest.fn();
  let selectedFilters: IFilter[] = [];

  render(
    <Filter
      options={OPTIONS}
      value={[]}
      onFilterSelect={(f: IFilter[]) => {
        selectedFilters = f;
        handlechange();
      }}
    />
  );

  let btn = screen.getByTestId("test-button");
  // open menu
  fireEvent.click(btn);

  let select = screen.getByTestId("test-filter-select-0");
  // open first select select
  fireEvent.click(select);

  let op_0 = screen.getByTestId("test-filter-option-0");
  // select first filter
  fireEvent.click(op_0);

  expect(selectedFilters[0].filters[0].value).toBe("All");
  expect(handlechange).toBeCalledTimes(1);
});

it("should remove selected filter correctly", () => {
  let handlechange = jest.fn();
  let selectedFilters: IFilter[] = [];

  render(
    <Filter
      options={OPTIONS}
      value={[
        {
          title: "Healthcare Facility Type",
          filters: [{ key: "0", value: "All" }],
        },
      ]}
      onFilterSelect={(f: IFilter[]) => {
        selectedFilters = f;
        handlechange();
      }}
    />
  );

  let btn = screen.getByTestId("test-button");
  // open menu
  fireEvent.click(btn);

  let select = screen.getByTestId("test-filter-select-0");
  // open first select select
  fireEvent.click(select);

  let op_0 = screen.getByTestId("test-filter-option-0");
  // select first filter
  fireEvent.click(op_0);

  expect(selectedFilters[0].filters.length).toBe(0);
});
