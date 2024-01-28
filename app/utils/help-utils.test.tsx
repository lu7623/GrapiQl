import { render } from "@testing-library/react";
import { Kinds, QueryType } from "../types";
import { EN } from "./dictionaries";
import {
  createPopupTooltip,
  generateTipsArr,
  useTipsCreator,
} from "./help-utils";
import { testSchema } from "@/__mocks__/schema";

jest.mock("../components/tips", () => {
  return {
    ObjectTooltip: jest.fn().mockReturnValue(<div>ObjectTooltip</div>),
  };
});
const mockDispatch = jest.fn();
jest.mock("../context/contexts", () => ({
  ...jest.requireActual("../context/contexts"),
  useServerRequestContext: jest.fn(() => {
    return {
      state: {
        tipsList: [],
        fullSchema: testSchema.data.__schema,
      },
      dispatch: mockDispatch,
    };
  }),
}));
jest.mock("../utils/useDictHook", () => {
  return {
    useDict: jest.fn().mockReturnValue(EN),
  };
});

describe("useTipsCreator hook", () => {
  it("should return func & call dispatcher on envoking", () => {
    const func = useTipsCreator();

    expect(typeof func).toEqual("function");

    func("Query");
    expect(mockDispatch).toHaveBeenCalled();
  });
});

describe("createPopupTooltip func", () => {
  it("should return correct node: default", () => {
    const entity = {
      kind: "test" as Kinds,
    };

    const { getByText } = render(createPopupTooltip(entity as QueryType, EN));

    expect(getByText("I can not describe this entity")).toBeInTheDocument();
  });
  it("should return correct node: scalar", () => {
    const entity = {
      name: "Test Name",
      kind: Kinds.SCALAR,
      description: "Test Descroption",
    };

    const { getByText } = render(createPopupTooltip(entity as QueryType, EN));

    expect(getByText("Test Name")).toBeInTheDocument();
    expect(getByText("Test Descroption")).toBeInTheDocument();
  });
  it("should return correct node: enum", () => {
    const entity = {
      name: "Test Name",
      kind: Kinds.ENUM,
      enumValues: [{ name: "ENUM1" }, { name: "ENUM2" }],
    };

    const { getByText } = render(createPopupTooltip(entity as QueryType, EN));

    expect(getByText("Test Name")).toBeInTheDocument();
    expect(getByText("ENUM1")).toBeInTheDocument();
    expect(getByText("ENUM2")).toBeInTheDocument();
  });
  it("should return correct node: object", () => {
    const entity = {
      name: "Test Name",
      kind: Kinds.OBJECT,
    };

    const { getByText } = render(createPopupTooltip(entity as QueryType, EN));

    expect(getByText("ObjectTooltip")).toBeInTheDocument();
  });
  it("should return correct node: input_object", () => {
    const entity = {
      name: "Test Name",
      kind: Kinds.INPUT_OBJECT,
    };

    const { getByText } = render(createPopupTooltip(entity as QueryType, EN));

    expect(getByText("ObjectTooltip")).toBeInTheDocument();
  });
});

describe("generateTipsArr func", () => {
  it("should decrease arr when element is not provided as argument", () => {
    const arr = [
      <div key={1}>1</div>,
      <div key={2}>2</div>,
      <div key={3}>3</div>,
    ];

    const newArr = generateTipsArr(arr);

    expect(newArr.length).toEqual(arr.length - 1);
  });

  it("should increase arr when element is provided as argument", () => {
    const arr = [
      <div key={1}>1</div>,
      <div key={2}>2</div>,
      <div key={3}>3</div>,
    ];

    const newArr = generateTipsArr(arr, <div key={4}>4</div>);

    expect(newArr.length).toEqual(arr.length + 1);
  });
});
