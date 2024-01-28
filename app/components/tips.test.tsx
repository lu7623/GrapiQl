import { render } from "@testing-library/react";
import {
  ArgsParser,
  FieldsParser,
  InputFieldsParser,
  ObjectTooltip,
  OfTypeParser,
  ReturnValueParser,
} from "./tips";
import { testSchema } from "@/__mocks__/schema";
import { Field, InputField, OfType, QueryType } from "../types";

describe("Parsers", () => {
  it("OfTypeParser should return correct node", () => {
    const entity = testSchema.data.__schema.types[1].fields![1].type;
    const { getByText } = render(<OfTypeParser entity={entity as OfType} />);
    expect(getByText("Country")).toBeInTheDocument();
  });

  it("ArgsParser should return correct node", () => {
    const entity = testSchema.data.__schema.types[1].fields![0];
    const { getByText } = render(<ArgsParser field={entity as Field} />);

    expect(getByText("lang:")).toBeInTheDocument();
    expect(getByText("String")).toBeInTheDocument();
  });

  it("InputFieldsParser should return correct node", () => {
    const entity = testSchema.data.__schema.types[2].inputFields;
    const { getByText } = render(
      <InputFieldsParser fields={entity as unknown as InputField[]} />
    );

    expect(getByText("code")).toBeInTheDocument();
    expect(getByText("StringQueryOperatorInput")).toBeInTheDocument();
  });

  it("ReturnValueParser should return correct node", () => {
    const entity = testSchema.data.__schema.types[1].fields![0];
    const { getByText } = render(<ReturnValueParser field={entity as Field} />);

    expect(getByText("ID")).toBeInTheDocument();
    expect(getByText("!")).toBeInTheDocument();
  });

  it("FieldsParser should return correct node", () => {
    const entity = testSchema.data.__schema.types[1].fields;
    const { getByText, getAllByText } = render(
      <FieldsParser fields={entity as Field[]} />
    );

    expect(getByText("ID")).toBeInTheDocument();
    expect(getAllByText("String").length).toEqual(2);
    expect(getByText("Country")).toBeInTheDocument();
  });

  it("ObjectTooltip should return correct node", () => {
    const entity = testSchema.data.__schema.types[1];
    const { getByText } = render(
      <ObjectTooltip entity={entity as unknown as QueryType} />
    );

    expect(getByText("Continent")).toBeInTheDocument();
    expect(getByText("Kind: (OBJECT)")).toBeInTheDocument();
  });
});
