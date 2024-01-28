import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

export const mockSession = {
  data: null,
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
};
const resp1 = { error: "Firebase: Error (auth/network-request-failed)." };
const resp2 = { error: "Firebase: Error (auth/invalid-credential)." };

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => {
    return { data: mockSession, status: "unauthenticated" };
  }),
  signIn: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve(resp2))
    .mockImplementation(() => Promise.resolve(resp1)),
}));
describe("Page", () => {
  beforeEach(() => {
    render(<Page />);
  });
  it("renders content", async () => {
    await waitFor(() => {
      const title = screen.getByText("Sign in to your account");
      const text = screen.getByText("Do not have an account?");

      expect(text).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });
  });

  it("Validate sign in form", async () => {
    const email = screen.getByRole("textbox", { name: /email/i });
    const password = screen.getByLabelText("Password");
    const btn = screen.getByText("Sign In");
    fireEvent.change(email, { target: { value: "111@test.com" } });
    fireEvent.change(password, { target: { value: "Pass111)" } });
    await waitFor(() => {
      expect(btn).not.toBeDisabled();
    });
  });
  it("Show network error", async () => {
    const email = screen.getByRole("textbox", { name: /email/i });
    const password = screen.getByLabelText("Password");
    const btn = screen.getByText("Sign In");
    fireEvent.change(email, { target: { value: "111@test.com" } });
    fireEvent.change(password, { target: { value: "Pass111)" } });
    await waitFor(() => {
      fireEvent.click(btn);
      expect(screen.getByText("Network failed")).toBeInTheDocument();
    });
  });
});
