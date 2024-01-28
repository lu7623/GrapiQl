import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
import { formatCode } from "../utils/formateCode";
import { Server } from "../context/contexts";
import { IResponse } from "../utils/request";

jest.mock("../utils/formateCode");
jest.mock("../components/help-section");
jest.mock("../components/server-chooser", () => {
  return {
    ServerChooser: jest.fn().mockReturnValue(<div>Server component</div>),
  };
});

jest.mock("../components/editor/editor", () => {
  return jest.fn().mockReturnValue(<div>Test Editor</div>);
});

const mockSignOut = jest.fn();

export const mockSession = {
  user: {
    token_expiry: "2022-12-20T16:33:26.618Z",
  },
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
};

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => {
    return { data: mockSession, status: "authenticated" };
  }),
  signOut: () => mockSignOut,
}));

type MockData = {
  data?: IResponse;
  errors?: string[];
};

const data: MockData = { errors: ["Mock errors"] };
let resp = {
  data: Promise.resolve(data),
  status: 400,
};
let mockSendRequest = jest
  .fn()
  .mockImplementationOnce(() => Promise.resolve(resp));

const mockQuery = `query Query() {
  country(code: "BR") {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}`;

const mockDispatch = () => "";

jest.mock("../context/contexts", () => ({
  ...jest.requireActual("../context/contexts"),
  useServerRequestContext: jest.fn(() => {
    return {
      state: {
        query: mockQuery,
        endpoint: Server.Countries,
        variables: `{"code": "BR"}`,
      },
      dispatch: mockDispatch,
    };
  }),
}));

const schemaRes = {
  data: Promise.resolve(data),
  status: 401,
};
const mockgetSchema = jest
  .fn()
  .mockImplementation(() => Promise.resolve(schemaRes));

jest.mock("../utils/request", () => ({
  sendRequest: () => mockSendRequest(),
  getSchema: () => mockgetSchema(),
}));

describe("Page", () => {
  beforeEach(() => {
    waitFor(() => {
      render(<Page />);
    });
  });

  it("renders content", async () => {
    await waitFor(() => {
      const text = screen.getByText("Main Page");
      const editorComponent = screen.getByText("Test Editor");
      const serverChooserLabel = screen.getByText("Server component");

      expect(text).toBeInTheDocument();
      expect(editorComponent).toBeInTheDocument();
      expect(serverChooserLabel).toBeInTheDocument();
    });
  });
  it("should format code on correct button click", async () => {
    await waitFor(() => {
      const correctBtn = screen.getByTitle("Prettify query");

      expect(correctBtn).toBeInTheDocument();
      fireEvent.click(correctBtn);
      expect(formatCode).toHaveBeenCalled();
    });
  });
  it("should call function and show mock errors responce", async () => {
    await waitFor(() => {
      const makeQueryBtn = screen.getByTitle("Execute query");
      expect(makeQueryBtn).toBeInTheDocument();

      fireEvent.click(makeQueryBtn);
      expect(mockSendRequest).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('"Mock errors"')).toBeInTheDocument();
    });
  });
  it("should show failed to fetch", async () => {
    mockSendRequest = jest.fn().mockImplementationOnce(() => Promise.reject());
    await waitFor(() => {
      const makeQueryBtn = screen.getByTitle("Execute query");
      fireEvent.click(makeQueryBtn);
      expect(mockSendRequest).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to fetch. Please check your network connection and URL address"
        )
      ).toBeInTheDocument();
    });
  });
  it("should show mock data", async () => {
    const data1: MockData = { data: { mockField: "Mock data" } };
    resp = {
      data: Promise.resolve(data1),
      status: 200,
    };
    mockSendRequest = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(resp));
    await waitFor(() => {
      const makeQueryBtn = screen.getByTitle("Execute query");
      fireEvent.click(makeQueryBtn);
      expect(mockSendRequest).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('"mockField": "Mock data"')).toBeInTheDocument();
    });
  });
  it("should show empty brackets if no data", async () => {
    const resp = {
      data: Promise.resolve({}),
      status: 400,
    };
    mockSendRequest = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(resp));
    await waitFor(() => {
      const makeQueryBtn = screen.getByTitle("Execute query");
      fireEvent.click(makeQueryBtn);
      expect(mockSendRequest).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText("Invalid query")).toBeInTheDocument();
      expect(screen.getByText("{}")).toBeInTheDocument();
    });
  });
});
