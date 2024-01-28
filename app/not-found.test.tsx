import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "./not-found";

describe("404 page", () => {
  it("renders content", () => {
    render(<NotFound />);

    const notFoundHeader = screen.getByText("Not Found");
    const notFoundDesc = screen.getByText("Could not find requested resource");
    const toMainBtn = screen.getByText("Welcome Page");
    const notFoundImg = screen.getByAltText("error");

    expect(notFoundHeader).toBeInTheDocument();
    expect(notFoundDesc).toBeInTheDocument();
    expect(toMainBtn).toBeInTheDocument();
    expect(notFoundImg).toBeInTheDocument();
  });
});
