import { render, screen, waitFor } from "@testing-library/react";
import { Variables } from "./variables";

describe("Variables", () => {
  it("renders variables section", async () => {
    render(<Variables />);
    await waitFor(async () => {
      const variables = screen.getByTitle("variables");
      const textbox = screen.getByRole("textbox");

      expect(variables).toBeInTheDocument();
      expect(textbox).toBeInTheDocument();
    });
  });
});
