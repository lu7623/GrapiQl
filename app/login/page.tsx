"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDict } from "../utils/useDictHook";
import { useState } from "react";
import { Form, IFormInput } from "../components/form";
import { SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { MdErrorOutline } from "react-icons/md";
import { auth } from "@/firebase";

const Page = () => {
  const { status } = useSession();
  const [error, setError] = useState("");
  const dict = useDict();
  if (status === "authenticated") redirect("/main");
  const [isRegistrated, setIsRegistrated] = useState(true);
  const signin: SubmitHandler<IFormInput> = async (data: {
    email: string;
    password: string;
  }) => {
    setError("");
    const email = data.email;
    const password = data.password;

    signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/main",
    }).then((res) => {
      if (res?.error === "Firebase: Error (auth/invalid-credential).")
        setError(dict.userNotFound);
      if (res?.error === "Firebase: Error (auth/network-request-failed).")
        setError(dict.networkFailed);
    });
  };
  const signup: SubmitHandler<IFormInput> = async (data: {
    email: string;
    password: string;
  }) => {
    setError("");
    const email = data.email;
    const password = data.password;

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        signIn("credentials", { email, password, callbackUrl: "/main" });
      })
      .catch((e) => {
        if (e.message === "Firebase: Error (auth/email-already-in-use).")
          setError(dict.alreadyExist);
        if (e.message === "Firebase: Error (auth/network-request-failed).")
          setError(dict.networkFailed);
      });
  };
  return (
    <>
      <div className="flex flex-col items-center min-h-screen justify-start">
        {error.length > 0 && (
          <div className=" bg-fuchsia-200 w-full h-7 flex justify-center items-center gap-2">
            <MdErrorOutline /> <span>{error}</span> <MdErrorOutline />
          </div>
        )}
        {isRegistrated ? (
          <Form name={dict.login} callback={signin} title={dict.loginTitle} />
        ) : (
          <Form
            name={dict.register}
            callback={signup}
            title={dict.signupTitle}
          />
        )}
        <div>{isRegistrated ? dict.notHaveAnAccount : dict.haveAnAccount}</div>
        <button
          className=" font-bold text-blue-500 ml-3 mb-10"
          onClick={() => {
            setIsRegistrated(!isRegistrated);
            setError("");
          }}
        >
          {isRegistrated ? dict.register : dict.login}
        </button>
      </div>
    </>
  );
};

export default Page;