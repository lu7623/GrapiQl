"use client";

import { ReactNode, useEffect, useReducer, useState } from "react";
import {
  InitialState,
  LangContext,
  Languages,
  ServerRequestContext,
  reducer,
} from "./contexts";
import Loading from "../loading";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState(Languages.En);
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const savedLang =
      !!localStorage.getItem("language") &&
      (localStorage.getItem("language") === "en" ? Languages.En : Languages.Ru);
    savedLang && setLang(savedLang);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ServerRequestContext.Provider value={{ state, dispatch }}>
          <LangContext.Provider value={{ lang, setLang }}>
            {children}
          </LangContext.Provider>
        </ServerRequestContext.Provider>
      )}
    </>
  );
};
