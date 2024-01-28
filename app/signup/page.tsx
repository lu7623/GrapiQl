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
import Link from "next/link";
import { auth } from "@/firebase";

const Page = () => {
  const { status } = useSession();
  if (status === "authenticated") redirect("/main");
  const [error, setError] = useState("");
  const dict = useDict();
  const signup: SubmitHandler<IFormInput> = async (data: {
    email: string;
    password: string;
  }) => {
    setError("");
    const email = data.email;
    const password = data.password;
    createUserWithEmailAndPassword(auth, email, password)
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
        <Form name={dict.register} callback={signup} title={dict.signupTitle} />

        <div>{dict.haveAnAccount}</div>
        <Link href="/signin" className=" font-bold text-blue-500 ml-3 mb-10">
          {dict.login}
        </Link>
      </div>
    </>
  );
};

export default Page;
