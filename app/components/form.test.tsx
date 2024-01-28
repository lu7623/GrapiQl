import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GlobalProvider } from "../context/context-provider";
import { Form } from "./form";

describe("Sign in form", () => {
  beforeEach(() => {
    render(
      <GlobalProvider>
        <Form
          name="Sign in"
          callback={() => {}}
          title="Sign in to your account"
        />
      </GlobalProvider>
    );
  });
  it("should render component", () => {
    const btn = screen.getByRole("button");
    const email = screen.getByText("Email address");
    const password = screen.getByText("Password");

    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
});
