"use client";
import { useEffect, useState } from "react";
import Editor from "../components/editor/editor";
import Viewer from "../components/viewer/viewer";
import { H1 } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { IResponse, getSchema, sendRequest } from "../utils/request";
import { signOut, useSession } from "next-auth/react";
import { ServerChooser } from "../components/server-chooser";
import { formatCode } from "../utils/formateCode";
import { GiComb } from "react-icons/gi";
import { BsPlayCircle } from "react-icons/bs";
import { useServerRequestContext } from "../context/contexts";
import { HelpSection } from "../components/help-section";
import { MdErrorOutline } from "react-icons/md";
import Loader from "../components/loader";

const Page = () => {
  const { status, data: sessionData } = useSession();
  const tokenExpiry = sessionData?.user.token_expiry;
  useEffect(() => {
    const isTokenExpired = tokenExpiry && new Date(tokenExpiry) < new Date();
    if (status === "authenticated" && isTokenExpired) {
      signOut({ callbackUrl: "/", redirect: true });
    }
  }, [sessionData, status, tokenExpiry]);
  const dict = useDict();
  const [response, setResponse] = useState<IResponse>({});
  const { state, dispatch } = useServerRequestContext();
  const [error, setError] = useState("");
  const [schemaErrors, setSchemaErrors] = useState("");
  useEffect(() => {
    setSchemaErrors("");
    getSchema(state.endpoint, state.headers)
      .then((newSchema) =>
        dispatch({ type: "setFullSchema", payload: newSchema })
      )
      .catch((e) => {
        if (e.message === "Unauthorized") {
          setSchemaErrors(dict.unauthorizedSchema);
        } else setSchemaErrors(dict.failedToLoadSchema);
      });
    setResponse({});
    setError("");
  }, [
    dispatch,
    state.endpoint,
    state.headers,
    dict.unauthorizedSchema,
    dict.failedToLoadSchema,
  ]);
  const handleCorrectBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const correctQuery = formatCode(state.query);
      dispatch({ type: "setQuery", payload: correctQuery });
      if (state.variables) {
        const correctVars = formatCode(state.variables);
        dispatch({ type: "setVariables", payload: correctVars });
      }
      if (state.headers) {
        const correctHeaders = formatCode(state.headers);
        dispatch({ type: "setHeaders", payload: correctHeaders });
      }
    }
  };

  const handleRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      setError("");
      sendRequest(state.query, state.endpoint, state.variables, state.headers)
        .then((res) => {
          if (res.status === 401) setError(dict.unauthorized);
          if (res.status === 400) setError(dict.invalidQuery);
          if (res.status >= 500) setError(dict.serverError);
          return res.data;
        })
        .then(({ data, errors, message }) => {
          if (errors || message) {
            setResponse(errors || message);
            errors && setError(dict.invalidQuery);
          } else if (data) {
            setResponse(data);
          } else setResponse({});
        })
        .catch(() => {
          setError(dict.failedToFetch);
          setResponse({});
        });
    }
  };
  return (
    <main className="p-3">
      <div className="text-[#f6009c] flex justify-end mt-2 mr-2">
        {sessionData?.user.token_expiry &&
          `${dict.tokenValid} ${new Date(sessionData?.user.token_expiry)
            .toLocaleTimeString()
            .slice(0, -3)}`}
      </div>
      <div className={H1}>{dict.mainPage}</div>
      <ServerChooser />
      {schemaErrors.length > 0 ? (
        <div className=" bg-fuchsia-200 w-full h-7 flex justify-center items-center gap-2">
          <MdErrorOutline /> <span>{schemaErrors}</span> <MdErrorOutline />
        </div>
      ) : state.fullSchema ? (
        <HelpSection />
      ) : (
        <Loader size={30} />
      )}
      <div className="sm:p-3 w-full min-h-screen  p-1 ">
        <section className=" rounded md:gap-2 sm:p-5 p-2 bg-fuchsia-50 grid lg:grid-cols-[1fr,50px,1fr] grid-cols-[1fr,30px] ">
          <div className=" flex flex-col h-screen overflow-auto">
            <Editor />
          </div>
          <div className="flex flex-col lg:w-14 w-10 items-center">
            <div className="md:w-10 md:h-10 h-6 w-6">
              <button
                type="button"
                className=" w-10/12 h-10/12 hover:w-full hover:h-full transition-all"
                onClick={handleRequest}
                title="Execute query"
              >
                <BsPlayCircle
                  style={{ color: "#f6009c", width: "100%", height: "100%" }}
                />
              </button>
            </div>
            <div className="md:w-10 md:h-10 h-6 w-6">
              <button
                type="button"
                className=" w-10/12 h-10/12 hover:w-full hover:h-full transition-all"
                onClick={handleCorrectBtn}
                title="Prettify query"
              >
                <GiComb
                  style={{ color: "#f6009c", width: "100%", height: "100%" }}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col overflow-auto h-screen">
            {error && (
              <div className=" bg-fuchsia-200 w-full h-7 flex justify-center items-center gap-2">
                <MdErrorOutline /> <span>{error}</span> <MdErrorOutline />
              </div>
            )}
            <Viewer response={response} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
