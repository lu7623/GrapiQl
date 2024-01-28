import { render, screen } from "@testing-library/react";
import Loading from "./loading";

describe("Loading page", () => {
  it("renders loader", () => {
    render(<Loading />);

    const loader = screen.getByAltText("loading");

    expect(loader).toBeInTheDocument();
  });
});
