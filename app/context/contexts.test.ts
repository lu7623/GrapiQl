import { useDict } from "../utils/useDictHook";
import { InitialState, reducer } from "./contexts";

jest.mock("react", () => {
  return {
    useContext: jest
      .fn()
      .mockReturnValueOnce({ lang: "en" })
      .mockReturnValueOnce({ lang: "fr" }),
    createContext: jest.fn(),
  };
});

describe("Custom useDict hook", () => {
  it("should return dictionary", () => {
    const dict = useDict();
    expect(dict).toBeTruthy();
  });

  it("should throw error when there is no any dict for language", () => {
    let errorMsg = "";
    try {
      useDict();
    } catch (error) {
      errorMsg = (error as Error).message;
    }
    expect(errorMsg).toEqual("There is no dictionary for such a language");
  });
});

describe("Reducer", () => {
  it("should return correct state", () => {
    const state = reducer(InitialState, {
      type: "setEndpoint",
      payload: "https://graphqlpokemon.favware.tech/v8",
    });
    expect(state.endpoint).toBe("https://graphqlpokemon.favware.tech/v8");
    const mockQuery = `query Query {
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
    const state2 = reducer(InitialState, {
      type: "setQuery",
      payload: mockQuery,
    });
    expect(state2.query).toBe(mockQuery);
    const state3 = reducer(InitialState, {
      type: "setHeaders",
      payload: ' {"Authorization": "Bearer My_Token" }',
    });
    expect(state3.headers).toBe(' {"Authorization": "Bearer My_Token" }');
    const state4 = reducer(InitialState, {
      type: "setVariables",
      payload: `{"name": "Morty"}`,
    });
    expect(state4.variables).toBe(`{"name": "Morty"}`);
    try {
      reducer(InitialState, { type: "wrong", payload: "" });
    } catch (e) {
      expect(e).toStrictEqual(Error("Wrong action"));
    }
  });
});
