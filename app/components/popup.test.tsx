import { render, screen, fireEvent } from "@testing-library/react";
import BigPopup from "./popup";

describe("ChangePasswordPopup", () => {
  const onClose = jest.fn();

  it("renders children and button Close", () => {
    render(
      <BigPopup onClose={onClose}>
        <div>Test</div>
      </BigPopup>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByTitle("Exit")).toBeInTheDocument();
  });

  it("calls onClose when button Close is clicked", () => {
    render(
      <BigPopup onClose={onClose}>
        <div>Test</div>
      </BigPopup>
    );

    const closeButton = screen.getByTitle("Exit");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
