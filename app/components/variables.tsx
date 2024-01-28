"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useServerRequestContext } from "../context/contexts";

const Codemirror = dynamic(() => import("./editor/Codemirror"), { ssr: false });

export const Variables = () => {
  const { state, dispatch } = useServerRequestContext();
  const initValue = state.variables ? state.variables : "";
  const [text, setText] = useState(initValue);

  useEffect(() => {
    setText(initValue);
  }, [initValue]);

  const handleChange = useCallback(
    (newText: string) => {
      setText(newText);
      dispatch({ type: "setVariables", payload: newText });
    },
    [dispatch]
  );

  return (
    <div className=" w-full flex h-full" title="variables">
      <Codemirror value={text} onChange={handleChange} />
    </div>
  );
};
