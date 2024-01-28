import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Editor from "./editor";

describe("Editor", () => {
  it("shows variables panel", async () => {
    render(<Editor />);

    const btn = screen.getByText("Variables");
    fireEvent.click(btn);
    await waitFor(() => {
      const variablesEditor = screen.getByTitle("variables");
      expect(variablesEditor).toBeInTheDocument();
    });
  });
  it("shows headers panel", async () => {
    render(<Editor />);

    const btn = screen.getByText("Headers");
    fireEvent.click(btn);
    await waitFor(() => {
      const headers = screen.getByTitle("headers");
      expect(headers).toBeInTheDocument();
    });
  });
  it("hides panel on arrow down", async () => {
    render(<Editor />);

    const btn = screen.getByText("Headers");
    fireEvent.click(btn);

    const headers = screen.getByTitle("headers");
    expect(headers).toBeInTheDocument();
    await waitFor(() => {
      const arrow = screen.getByTitle("arrow-down");
      fireEvent.click(arrow);
      expect(headers).not.toBeInTheDocument();
    });
  });
});
