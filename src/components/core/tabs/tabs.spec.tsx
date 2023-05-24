import "@testing-library/jest-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import {TAB_ITEMS} from "constants/testData";
import {sleep} from "utils/time";
import Tabs, {TabObject} from ".";

it("should render tabs", () => {
  render(
    <Tabs tabs={TAB_ITEMS} selected={TAB_ITEMS[0].id} onChange={jest.fn} />
  );
});

it("should select desired tab", () => {
  let selectedTab = TAB_ITEMS[1];
  render(
    <Tabs tabs={TAB_ITEMS} selected={selectedTab.id} onChange={jest.fn} />
  );

  let tab = screen.getByText(selectedTab.title);

  expect(tab).toHaveAttribute("data-is-selected", "true");
});

it("should render async tab", () => {
  let selectedTab = TAB_ITEMS[0];

  let asyncFunction = jest.fn(async () => {
    await sleep(1000);
    return "async data";
  });
  let handleChange = jest.fn((_tab: TabObject, _data: any) => {
    console.log("called");
  });

  render(
    <Tabs
      beforeChange={asyncFunction}
      type="async"
      tabs={TAB_ITEMS}
      selected={selectedTab.id}
      onChange={handleChange}
    />
  );

  let otherTab = screen.getByText(TAB_ITEMS[0].title);

  fireEvent.click(otherTab);

  expect(asyncFunction).toBeCalledTimes(1);
});
