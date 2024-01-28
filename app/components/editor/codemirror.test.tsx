import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Codemirror from "./Codemirror";
import { useCodemirrorHook } from "@/app/utils/useCodemirrorHook";

jest.mock("../../utils/useCodemirrorHook");

describe("Codemirror", () => {
  const mockOnChange = jest.fn();
  it("should call onChange with empty string when input is empty", () => {
    render(<Codemirror value="" onChange={mockOnChange} />);

    expect(mockOnChange).not.toHaveBeenCalledWith("");
  });
  it("have not call callback without prop callback", () => {
    render(<Codemirror value="initial value" />);

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(useCodemirrorHook).toHaveBeenCalledWith({
      onChange: undefined,
      value: "initial value",
    });
  });
});
