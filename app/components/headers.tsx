"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useServerRequestContext } from "../context/contexts";

const Codemirror = dynamic(() => import("./editor/Codemirror"), { ssr: false });

export const Headers = () => {
  const { state, dispatch } = useServerRequestContext();
  const initValue = state.headers ? state.headers : "";
  const [text, setText] = useState(initValue);

  useEffect(() => {
    setText(initValue);
  }, [initValue]);

  const handleChange = useCallback(
    (newText: string) => {
      setText(newText);
      dispatch({ type: "setHeaders", payload: newText });
    },
    [dispatch]
  );

  return (
    <div className=" w-full flex h-full" title="headers">
      <Codemirror value={text} onChange={handleChange} />
    </div>
  );
};
