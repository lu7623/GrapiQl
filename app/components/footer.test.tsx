import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./footer";

describe("Footer", () => {
  it("renders content", () => {
    render(<Footer />);

    const footerText = screen.getByText("@2023");

    expect(footerText).toBeInTheDocument();
  });
});
