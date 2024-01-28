import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useCodemirrorHook } from "./useCodemirrorHook";

describe("useCodemirrorHook", () => {
  it("should update editorView state when value changes", () => {
    const mockOnChange = jest.fn();
    const value = 'query{name(arg:"name")name{name}}';

    const TestComponent = () => {
      const ref = useCodemirrorHook<HTMLDivElement>({
        value,
        onChange: mockOnChange,
      });
      return <div ref={ref} />;
    };

    render(<TestComponent />);
    const container = document.querySelector(".cm-scroller") as HTMLElement;
    expect(container.textContent).toBe(`91${value}`);
  });

  it("should not update editorView state when value is empty", () => {
    const mockOnChange = jest.fn();
    let value = 'query{name(arg:"name")name{name}}';

    const TestComponent = () => {
      const ref = useCodemirrorHook<HTMLDivElement>({
        value,
        onChange: mockOnChange,
      });
      return <div ref={ref} />;
    };

    render(<TestComponent />);
    const container = document.querySelector(".cm-scroller") as HTMLElement;
    expect(container.textContent).toBe(`91${value}`);

    value = "";

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
