/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { ViewUpdate } from "@codemirror/view";
import { EditorView } from "@codemirror/view";

type Props = {
  value: string;
  onChange?: (state: EditorState) => void | false;
};

export const useCodemirrorHook = <ElementType extends Element>(
  props: Props
): React.MutableRefObject<ElementType | null> => {
  const ref = useRef<ElementType>(null);

  const { onChange, value } = props;

  const [editorView, setEditorView] = useState<EditorView | null>(null);

  useEffect(() => {
    const { EditorView } = require("@codemirror/view");
    const { EditorState } = require("@codemirror/state");
    const { lineNumbers } = require("@codemirror/view");
    const { history } = require("@codemirror/commands");
    const {
      autocompletion,
      closeBrackets,
    } = require("@codemirror/autocomplete");
    const {
      bracketMatching,
      syntaxHighlighting,
    } = require("@codemirror/language");
    const {
      oneDarkHighlightStyle,
      oneDark,
    } = require("@codemirror/theme-one-dark");

    const myTheme = EditorView.theme({
      "&": {
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(245 239 251)",
        display: "flex",
      },
      ".cm-scroller": { overflow: "auto" },
      ".cm-content, .cm-gutter": { minHeight: "200px", width: "100%" },
      ".cm-gutters": {
        backgroundColor: "rgb(240 231 250)",
      },
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        syntaxHighlighting(oneDarkHighlightStyle),
        history(),
        lineNumbers(),
        bracketMatching(),
        autocompletion(),
        closeBrackets(),
        myTheme,
        oneDark,
        !!onChange
          ? EditorView.updateListener.of((update: ViewUpdate) => {
              if (update.changes) {
                onChange && onChange(update.state);
              }
            })
          : EditorView.editable.of(false),
      ],
    });

    const editorView = new EditorView({
      state,
      parent: ref.current!,
    });

    setEditorView(editorView);

    return () => editorView.destroy();
  }, [ref]);

  useEffect(() => {
    const validValue = value || value === "";
    if (!editorView || !validValue) return;

    const currentValue = editorView.state.doc.toString();
    if (value !== currentValue) {
      editorView.dispatch({
        changes: { from: 0, to: editorView.state.doc.length, insert: value },
      });
    }
  }, [value, editorView]);

  return ref;
};
