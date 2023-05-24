import {render, screen} from "@testing-library/react";
import Card from "components/core/card/index";

it("should render card", () => {
  render(<Card data-testid={"card"} />);

  let card = screen.getByTestId("card");

  expect(card).toBeDefined();
});
