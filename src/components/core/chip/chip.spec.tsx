import {render, screen} from "@testing-library/react";
import Chip from ".";

it("should render chip", () => {
  render(<Chip text="chip" />);

  let chip = screen.getByTestId("test-chip");

  expect(chip).toBeDefined();
});
