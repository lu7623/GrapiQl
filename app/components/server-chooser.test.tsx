import { act, fireEvent, render, screen } from "@testing-library/react";
import { ServerChooser } from "./server-chooser";
import { Server } from "../context/contexts";

describe("Server chooser component", () => {
  it("should render inputs", () => {
    const { getByText, getByRole } = render(<ServerChooser />);
    expect(getByText("Please choose the server:")).toBeInTheDocument();
    expect(getByRole("combobox")).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("shoud change endpoint value", () => {
    render(<ServerChooser />);

    const serverChooserSelector: HTMLSelectElement =
      screen.getByText("Countries");
    expect(serverChooserSelector.value).toEqual(
      "https://countries.trevorblades.com/graphql"
    );

    act(() => {
      fireEvent.change(serverChooserSelector, {
        target: { value: Server.Rick },
      });
    });

    expect(serverChooserSelector.value).toEqual(
      "https://rickandmortyapi.com/graphql"
    );
  });
});
