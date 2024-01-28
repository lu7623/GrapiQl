import { ChangeEvent, FormEvent, useRef } from "react";
import { Server, useServerRequestContext } from "../context/contexts";
import { useDict } from "../utils/useDictHook";
import { H3, INPUT, USUAL_BTN } from "../styles/uni-classes";

export const ServerChooser = () => {
  const dict = useDict();
  const { state, dispatch } = useServerRequestContext();
  const input = useRef<HTMLInputElement | null>(null);
  const fillInputIn = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    input.current!.value = event.target.value;
  };
  const handleServerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "setFullSchema", payload: null });
    dispatch({ type: "setTipsList", payload: [] });
    const newEndpoint = input.current!.value;
    dispatch({ type: "setEndpoint", payload: newEndpoint });
    dispatch({ type: "setVariables", payload: "" });
    dispatch({ type: "setHeaders", payload: "" });
  };

  return (
    <section className="flex flex-col items-center">
      <form
        onSubmit={handleServerSubmit}
        className="flex flex-col md:flex-row justify-center items-center gap-2"
      >
        <label>
          <span className={H3}>{dict.serverChooserLabel}</span>
          <select
            className={INPUT}
            name="serverSelector"
            defaultValue={state.endpoint}
            onChange={fillInputIn}
          >
            <option value={Server.Countries}>{dict.countries}</option>
            <option value={Server.Rick}>{dict.rickAndMorty}</option>
            <option value={Server.Swapi}>{dict.swapi}</option>
            <option value={Server.Custom}>{dict.customServer}</option>
          </select>
        </label>
        <input
          ref={input}
          type="url"
          name="serverInput"
          className={INPUT}
          defaultValue={state.endpoint}
          required
        />
        <input className={USUAL_BTN} type="submit" value={dict.setServer} />
      </form>
      <div className="flex md:flex-row flex-col items-baseline">
        <span className={H3}>{dict.actualServer}</span>
        <p className="px-0 md:px-2 mb-2 font-">{state.endpoint}</p>
      </div>
    </section>
  );
};
