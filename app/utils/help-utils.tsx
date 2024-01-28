import { ReactNode } from "react";
import { H2 } from "../styles/uni-classes";
import { useDict } from "./useDictHook";
import { EN } from "./dictionaries";
import { useServerRequestContext } from "../context/contexts";
import { QueryType } from "../types";
import { ObjectTooltip } from "../components/tips";

export const useTipsCreator = () => {
  const dict = useDict();
  const {
    state: { tipsList, fullSchema },
    dispatch,
  } = useServerRequestContext();

  return function tipsCreator(entityName: string) {
    const entity = fullSchema?.types.find((type) => type.name === entityName);
    if (entity) {
      const tipElement = createPopupTooltip(entity, dict);
      const newTips = generateTipsArr(tipsList, tipElement);
      dispatch({ type: "setTipsList", payload: newTips });
    }
  };
};

export const createPopupTooltip = (entity: QueryType, dict: typeof EN) => {
  switch (entity.kind) {
    case "SCALAR": {
      return (
        <div className="absolute">
          <div className={H2}>{entity.name}</div>
          <p>{entity.description}</p>
        </div>
      );
    }
    case "ENUM": {
      const values = entity.enumValues!.map((value) => (
        <p key={value.name}>{value.name}</p>
      ));
      return (
        <div className="absolute">
          <div className={H2}>{entity.name}</div>
          <div>{dict.enums}</div>
          {values}
        </div>
      );
    }
    case "OBJECT":
    case "INPUT_OBJECT": {
      return <ObjectTooltip entity={entity} key={entity.name} />;
    }
    default:
      return <div className="absolute">{dict.createPopupTooltipError}</div>;
  }
};

export const generateTipsArr = (
  tips: (Element | ReactNode)[],
  element?: React.JSX.Element
) => {
  const newTips = [...tips];
  if (element) {
    newTips.push(element);
    return newTips;
  }
  newTips.pop();
  return newTips;
};
