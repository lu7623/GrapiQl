import { useCodemirrorHook } from "@/app/utils/useCodemirrorHook";
import React, { useCallback } from "react";
import { EditorState } from "@codemirror/state";

export type CodemirrorProps = {
  value: string;
  onChange?: (doc: string) => void;
};

const Codemirror = (props: CodemirrorProps) => {
  const { onChange, value } = props;

  const handleChange = useCallback(
    (state: EditorState) => !!onChange && onChange(state.doc.toString()),
    [onChange]
  );
  const ref = useCodemirrorHook<HTMLDivElement>({
    value,
    onChange: !!onChange ? handleChange : undefined,
  });

  return (
    <div
      className=" flex shadow-xl text-xs md:text-sm h-full w-full"
      ref={ref}
      data-testid="codemirror"
    ></div>
  );
};

export default Codemirror;
