export const formatCode = (text: string, indent = 0): string => {
  if (!text || text.trim() === "") return "";

  const lines = text.split("\n");

  let result = "";
  let openBracketsCount = 0;

  let sumLines = "";

  for (const line of lines) {
    line.trim() === "" || line.trim().startsWith("#")
      ? (result += line + "\n")
      : (sumLines += line);
  }
  const trimmedLine = sumLines
    .replace(/\s*([{}():,])\s*/g, "$1")
    .replace(/(?<=\w)\s+(?=\w)/g, " ");
  for (let i = 0; i < trimmedLine.length; i += 1) {
    const char = trimmedLine[i];
    const nextChar = trimmedLine[i + 1];
    const prevChar = trimmedLine[i - 1];
    if (char === "{") {
      result += !prevChar
        ? "{\n" + "  ".repeat(indent + 1)
        : " {\n" + "  ".repeat(indent + 1);
      indent += 1;
      openBracketsCount += 1;
    } else if (char === "}") {
      indent -= 1;
      openBracketsCount -= 1;
      result += "\n" + "  ".repeat(indent) + "}";

      if (i < trimmedLine.length - 1 && trimmedLine[i + 1].match(/[a-zA-Z]/)) {
        result += "\n" + "  ".repeat(indent);
      }
    } else if (char === ":") {
      result += ": ";
    } else if (char === ",") {
      result += "," + "\n" + "  ".repeat(indent);
    } else if (
      char === " " &&
      nextChar &&
      nextChar.match(/[a-zA-Z]/) &&
      prevChar &&
      prevChar.match(/[a-zA-Z]/)
    ) {
      result += "\n" + "  ".repeat(indent);
    } else {
      result += char;
    }
  }

  if (openBracketsCount > 0) {
    result += "\n" + "  ".repeat(indent - 1) + "}".repeat(openBracketsCount);
  }

  const inBrackets = result.match(/\(([^)]+)\)/g);
  let resCheckBrackets = result;
  if (inBrackets) {
    for (const char of inBrackets) {
      resCheckBrackets = resCheckBrackets.replace(
        char,
        char.replace(/(\r\n|\n|\r)/gm, " ").replace(/  +/g, " ")
      );
    }
  }
  return resCheckBrackets
    .replace(/\n\s*\n/g, "\n")
    .replace(/(\n {)|(\n +{)/g, " {");
};
