import { formatCode } from "./formateCode";

describe("formatCode", () => {
  it("should format the code correctly", () => {
    const unformattedCode =
      "#testcode\nquery{pokemons(first:2){name code{name}}}";
    const expectedFormattedCode = `#testcode\nquery {\n  pokemons(first: 2) {\n    name\n    code {\n      name\n    }\n  }\n}`;
    const formattedCode = formatCode(unformattedCode);
    expect(formattedCode).toEqual(expectedFormattedCode);
  });
  it("should format variables correctly", () => {
    const unformattedCode = "{ 'hero': 'morty', 'id': 1}";
    const expectedFormattedCode = `{\n  'hero': 'morty',\n  'id': 1\n}`;
    const formattedCode = formatCode(unformattedCode);
    expect(formattedCode).toEqual(expectedFormattedCode);
  });
});
