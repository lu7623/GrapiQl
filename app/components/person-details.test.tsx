import { render } from "@testing-library/react";
import PersonDetailes from "./person-details";

describe("PersonDetailes", () => {
  const data = {
    name: "Lena",
    role: "developer",
    photoUrl: "/Merkulova.jpg",
    githubUrl: "https://github.com",
    description: "description",
    contributions: ["contributions"],
  };
  it("should render with correct data", () => {
    const { getByText } = render(<PersonDetailes {...data} />);

    expect(getByText(data.name)).toBeInTheDocument();
    expect(getByText(data.role)).toBeInTheDocument();
    expect(getByText(data.description)).toBeInTheDocument();
    expect(getByText(data.contributions[0])).toBeInTheDocument();
  });

  it("should render Image component", () => {
    const { container } = render(<PersonDetailes {...data} />);
    const imageComponent = container.querySelector("img");

    expect(imageComponent).not.toBeNull();
  });
});
