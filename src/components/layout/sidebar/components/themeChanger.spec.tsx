import { fireEvent, render, screen } from "@testing-library/react";
import ThemeChanger from "./themeChanger";
import "@testing-library/jest-dom";
import { ThemeModeProvider } from "components/provider/themeMode";

test("it should render the component", () => {
  render(<ThemeChanger />);
  const themeChangerElement = screen.getByTestId("theme-changer");
  expect(themeChangerElement).toBeDefined();
});

const TestComponent = () => {
  return (
    <div data-testid="root" id="root">
      <ThemeModeProvider>
        <ThemeChanger />
      </ThemeModeProvider>
    </div>
  );
};

test("switching between dark and light mode", async () => {
  render(<TestComponent />);

  const darkLightSwitch = screen.getByTestId("dark-light-switch");

  expect(screen.getByTestId("root")).toHaveAttribute(
    "data-theme",
    "royal_blue_light"
  );

  fireEvent.click(darkLightSwitch);

  expect(await screen.findByTestId("root")).toHaveAttribute(
    "data-theme",
    "royal_blue_dark"
  );

  const greenTheme = screen.getByTestId("shamrock");
  const yellowTheme = screen.getByTestId("gold");

  fireEvent.click(yellowTheme);

  expect(await screen.findByTestId("root")).toHaveAttribute(
    "data-theme",
    "gold_dark"
  );

  fireEvent.click(darkLightSwitch);

  expect(await screen.findByTestId("root")).toHaveAttribute(
    "data-theme",
    "gold_light"
  );

  fireEvent.click(greenTheme);

  expect(await screen.findByTestId("root")).toHaveAttribute(
    "data-theme",
    "shamrock_light"
  );
});
