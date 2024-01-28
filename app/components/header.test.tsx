import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./header";
import { GlobalProvider } from "../context/context-provider";
import { SessionProvider } from "../SessionProvider";
import fetchMock from "jest-fetch-mock";

const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: () => mockRedirect,
  navigation: jest.fn(),
}));

export const mockSession = {
  data: null,
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  status: "unauthenticated",
};

beforeEach(() => {
  fetchMock.mockResponse(JSON.stringify(mockSession));

  jest.mock("next-auth/react", () => ({
    useSession: () => jest.fn().mockReturnValueOnce(mockSession),
    signIn: jest.fn(),
  }));
});
describe("Header", () => {
  beforeEach(() => {
    waitFor(() => {
      render(
        <SessionProvider>
          <GlobalProvider>
            <Header />
            <div>Children</div>
          </GlobalProvider>
        </SessionProvider>
      );
    });
  });
  it("should take the default lang from Context", () => {
    const enBtn = screen.getByText("EN");
    const ruBtn = screen.getByText("RU");

    expect((enBtn as HTMLButtonElement).disabled).toEqual(true);
    expect((ruBtn as HTMLButtonElement).disabled).toEqual(false);
  });

  it("should change lang on btns click", () => {
    const ruBtn = screen.getByText("RU");
    act(() => {
      fireEvent.click(ruBtn);
    });
    const translatedRuBtn = screen.getByText("РУС");

    expect((translatedRuBtn as HTMLButtonElement).disabled).toEqual(true);
  });
});

describe("Header", () => {
  beforeEach(() => {
    waitFor(() => {
      render(
        <SessionProvider>
          <Header />
        </SessionProvider>
      );
    });
  });

  it("renders content", () => {
    const langEn = screen.getByText("EN");
    const langRu = screen.getByText("RU");
    const mainIcon = screen.getByTitle("welcome page");
    const exitIcon = screen.getByTitle("sign out");
    const signInIcon = screen.getByTitle("sign in");

    expect(langEn).toBeInTheDocument();
    expect(langRu).toBeInTheDocument();
    expect(mainIcon).toBeInTheDocument();
    expect(exitIcon).toBeInTheDocument();
    expect(signInIcon).toBeInTheDocument();
  });
  it("changes styles if to have scroll", async () => {
    const scrollEvent = new Event("scroll");
    const header = screen.getByRole("banner");

    await waitFor(() => {
      window.scrollY = 10;
      window.dispatchEvent(scrollEvent);
    });

    expect(header).toHaveClass(
      "bg-purple-200 py-2 fixed top-0 w-full transition-colors"
    );

    await waitFor(() => {
      window.scrollY = 0;
      window.dispatchEvent(scrollEvent);
    });

    expect(header).toHaveClass("bg-header py-5 transition-colors");
  });
});
