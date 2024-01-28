import { fireEvent, render } from "@testing-library/react";
import PersonCard from "./person-card";

const data = {
  name: "Lena",
  role: "developer",
  photoUrl: "/Merkulova.jpg",
  githubUrl: "https://github.com",
  onClick: jest.fn(),
};

describe("PersonCard", () => {
  it("should render with correct data", () => {
    const { getByText } = render(<PersonCard {...data} />);

    expect(getByText("developer")).toBeInTheDocument();
    expect(getByText(data.role)).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const { container } = render(<PersonCard {...data} />);
    const imageComponent = container.querySelector("img");

    if (imageComponent) fireEvent.click(imageComponent);

    expect(data.onClick).toHaveBeenCalled();
  });
});
