import {fireEvent, render, screen} from "@testing-library/react";
import PhoneInput from ".";

it("should render phone input", () => {
  render(
    <PhoneInput
      countries={[
        { flag: "", code: "90" },
        { flag: "", code: "91" },
        { flag: "", code: "92" },
      ]}
    />
  );

  let phoneInput = screen.getByTestId("test-phone-box");

  expect(phoneInput).toBeDefined();
});

it("should type in input", () => {
  let testText = "9149783368";
  let result = "";
  render(
    <PhoneInput
      countries={[
        { flag: "", code: "90" },
        { flag: "", code: "91" },
        { flag: "", code: "92" },
      ]}
      onChange={(c, ph) => {
        result = c.code + ph;
      }}
      value={{ code: "", number: "" }}
    />
  );

  let input = screen.getByTestId("test-phone-input");

  fireEvent.change(input, {
    target: { value: testText },
  });

  expect(result).toEqual("90" + testText);
});

it("should select country", () => {
  let testText = "9149783368";
  let result = "";
  render(
    <PhoneInput
      countries={[
        { flag: "", code: "90" },
        { flag: "", code: "91" },
        { flag: "", code: "98" },
      ]}
      onChange={(c, ph) => {
        result = c.code + ph;
      }}
      value={{ code: "90", number: testText }}
    />
  );

  // open menu
  let menu = screen.getByTestId("test-phone-menu");
  fireEvent.click(menu);

  // select country
  let op = screen.getByTestId(`test-phone-country-98`);
  fireEvent.click(op);

  expect(result).toEqual("98" + testText);
});
