import { ReactNode, createContext, useContext } from "react";
import { FullSchema } from "../types";

export enum Server {
  Countries = "https://countries.trevorblades.com/graphql",
  Rick = "https://rickandmortyapi.com/graphql",
  Swapi = "https://swapi-graphql.netlify.app/.netlify/functions/index",
  Custom = "",
}

export enum Languages {
  En = "en",
  Ru = "ru",
}

export type LangContext = {
  lang: Languages;
  setLang: React.Dispatch<React.SetStateAction<Languages>>;
};

export const LangContext = createContext<LangContext>({
  lang: Languages.En,
  setLang() {},
});

type State = {
  endpoint: string;
  query: string;
  variables?: string;
  headers?: string;
  fullSchema: FullSchema | null;
  tipsList: (Element | ReactNode)[];
};

type Action = {
  type: string;
  payload: string | FullSchema | (Element | ReactNode)[] | null;
};

export const InitialState: State = {
  endpoint: Server.Countries,
  query: "",
  fullSchema: null,
  tipsList: [],
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setEndpoint":
      return { ...state, endpoint: action.payload };
    case "setQuery":
      return { ...state, query: action.payload };
    case "setVariables":
      return { ...state, variables: action.payload };
    case "setHeaders":
      return { ...state, headers: action.payload };
    case "setFullSchema":
      return { ...state, fullSchema: action.payload };
    case "setTipsList":
      return { ...state, tipsList: action.payload };
    default:
      throw new Error("Wrong action");
  }
};

export const ServerRequestContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: InitialState,
  dispatch: () => null,
});

export const useServerRequestContext = () => {
  return useContext(ServerRequestContext);
};
