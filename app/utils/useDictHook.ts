import { useContext } from "react";
import { LangContext, Languages } from "../context/contexts";
import { EN, RU } from "./dictionaries";

export const useDict = () => {
  const { lang } = useContext(LangContext);
  switch (lang) {
    case Languages.En:
      return EN;
    case Languages.Ru:
      return RU;
    default:
      throw new Error("There is no dictionary for such a language");
  }
};
