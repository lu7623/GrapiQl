import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "./layout";

jest.mock("./components/header", () => {
  return {
    Header: jest.fn().mockReturnValue(<div>Test Header</div>),
  };
});
jest.mock("./components/footer", () => {
  return {
    Footer: jest.fn().mockReturnValue(<div>Test Footer</div>),
  };
});
// eslint-disable-next-line no-console
console.error = jest.fn();

describe("Layout", () => {
  it("renders header, content & footer", () => {
    render(
      <RootLayout>
        <div>Children</div>
      </RootLayout>
    );

    const header = screen.getByText("Test Header");
    const mainContent = screen.getByText("Children");
    const footer = screen.getByText("Test Footer");

    expect(header).toBeInTheDocument();
    expect(mainContent).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
