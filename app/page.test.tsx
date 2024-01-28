import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

jest.mock("next-auth/react", () => ({
  useSession: () => jest.fn(),
}));

describe("Home component:", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders content", () => {
    const header = screen.getByText("Welcome Page");
    const editorNotAvailMsg = screen.getByText("You are not authenticated", {
      exact: false,
    });

    expect(header).toBeInTheDocument();
    expect(editorNotAvailMsg).toBeInTheDocument();
  });

  it("should open popup", () => {
    const person = screen.getByAltText("Lyubov Agulova");
    act(() => {
      fireEvent.click(person);
    });
    const text = screen.getByText("Contributions to GraphiQL", {
      exact: false,
    });

    expect(text).toBeInTheDocument();
  });

  it("should close popup", async () => {
    const person = screen.getByAltText("Lyubov Agulova");
    act(() => {
      fireEvent.click(person);
    });
    const exit = screen.getByTitle("Exit");
    act(() => {
      fireEvent.click(exit);
    });
    expect(exit).not.toBeInTheDocument();
  });
});
