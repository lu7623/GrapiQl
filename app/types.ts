export interface Data {
  __type: QueryType;
}

export enum Kinds {
  OBJECT = "OBJECT",
  SCALAR = "SCALAR",
  ENUM = "ENUM",
  INPUT_OBJECT = "INPUT_OBJECT",
  NON_NULL = "NON_NULL",
  LIST = "LIST",
}

export interface QueryType {
  name: string;
  kind: Kinds;
  description: string;
  fields: Field[] | null;
  enumValues: EnumValue[] | null;
  inputFields: InputField[];
}

export interface InputField {
  name: string;
  type: InputFieldType;
  description: string;
  defaultValue: string;
}

interface InputFieldType {
  name: string | null;
  kind: Kinds;
  description: string | null;
  ofType: OfType | null;
}

export interface Field {
  name: string;
  description: string | null;
  args: Arg[];
  type: FieldType;
}

interface EnumValue {
  name: string;
}

export interface Arg {
  name: string;
  description: string | null;
  type: ArgType;
}

interface ArgType {
  name: string | null;
  kind: Kinds;
  description: string | null;
  ofType: OfType | null;
}

export interface OfType {
  name: string | null;
  kind: Kinds;
  description: string | null;
  ofType: OfType | null;
}

interface FieldType {
  name: string | null;
  kind: Kinds;
  description: string | null;
  ofType: OfType;
}

export type FullSchema = {
  queryType: QueryType | null;
  mutationType: QueryType | null;
  subscriptionType: QueryType | null;
  types: QueryType[];
};
