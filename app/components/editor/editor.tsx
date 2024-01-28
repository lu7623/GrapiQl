"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useDict } from "@/app/utils/useDictHook";
import dynamic from "next/dynamic";
import { useServerRequestContext } from "@/app/context/contexts";
import { IoIosArrowDropdown } from "react-icons/io";
import { Variables } from "../variables";
import { Headers } from "../headers";

const Codemirror = dynamic(() => import("./Codemirror"), { ssr: false });

const Editor = () => {
  const { state, dispatch } = useServerRequestContext();
  const dict = useDict();
  const initialText =
    state.query.length > 0 ? state.query : dict.defaultTextEditor;
  const [text, setText] = useState(initialText);
  const [lowerPanel, setLowerPanel] = useState("");

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleChange = useCallback(
    (newText: string) => {
      setText(newText);
      dispatch({ type: "setQuery", payload: newText });
    },
    [dispatch]
  );

  return (
    <>
      <Codemirror value={text} onChange={handleChange} />
      <div className=" flex  justify-between p-3 shadow-md my-1">
        <div className="flex">
          <button
            onClick={() => setLowerPanel("variables")}
            className={
              lowerPanel === "variables"
                ? "text-[#f6009c]  shadow-slate-900 shadow-sm mx-2 rounded-sm px-2"
                : " mx-2 text-[#f6009c] shadow-none"
            }
          >
            {dict.variables}
          </button>
          <button
            onClick={() => setLowerPanel("headers")}
            className={
              lowerPanel === "headers"
                ? "text-[#f6009c]  shadow-slate-900 shadow-sm mx-2 rounded-sm px-2"
                : " mx-2 text-[#f6009c] shadow-none"
            }
          >
            {dict.headers}
          </button>
        </div>
        <button
          onClick={() =>
            lowerPanel.length > 0
              ? setLowerPanel("")
              : setLowerPanel("variables")
          }
        >
          <IoIosArrowDropdown
            title="arrow-down"
            style={
              lowerPanel.length > 0
                ? {
                    color: "#f6009c",
                    width: "100%",
                    height: "100%",
                    transform: "rotate(0.5turn)",
                  }
                : { color: "#f6009c", width: "100%", height: "100%" }
            }
          />
        </button>
      </div>
      {lowerPanel.length > 0 && (
        <div className="h-40 shadow-md  transition-all">
          {lowerPanel === "variables" ? <Variables /> : <Headers />}
        </div>
      )}
    </>
  );
};

export default Editor;
