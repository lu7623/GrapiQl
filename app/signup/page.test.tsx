import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

export const mockSession = {
  data: null,
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
};

const mockSignUp = jest
  .fn()
  .mockImplementation(() =>
    Promise.reject(new Error("Firebase: Error (auth/network-request-failed)."))
  );

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => {
    return { data: mockSession, status: "unauthenticated" };
  }),
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: () => mockSignUp(),
}));

jest.mock("@/firebase", () => ({
  auth: () => jest.fn(),
}));

describe("Sign up page", () => {
  beforeEach(() => {
    render(<Page />);
  });
  it("renders signup form", async () => {
    await waitFor(() => {
      const text2 = screen.getByText("Already have an account?");
      const title = screen.getByText("Registration");

      expect(text2).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });
  });
  it("Validate sign up form", async () => {
    const btn = screen.getByText("Sign Up");
    fireEvent.click(btn);

    await waitFor(async () => {
      const email = screen.getByRole("textbox", { name: /email/i });
      const password = screen.getByLabelText("Password");
      const submit = screen.getByText("Sign Up");
      fireEvent.change(email, { target: { value: "fail" } });
      fireEvent.change(password, { target: { value: "weak" } });
      expect(submit).toBeDisabled();
      expect(screen.getByText("Incorrect email address")).toBeInTheDocument();
    });
  });
  it("Show network error", async () => {
    const btn = screen.getByText("Sign Up");
    fireEvent.click(btn);

    await waitFor(async () => {
      const email = screen.getByRole("textbox", { name: /email/i });
      const password = screen.getByLabelText("Password");
      const submit = screen.getByText("Sign Up");
      fireEvent.change(email, { target: { value: "john@test.com" } });
      fireEvent.change(password, { target: { value: "Pass111)" } });
      fireEvent.click(submit);
      expect(screen.getByText("Network failed")).toBeInTheDocument();
    });
  });
});
