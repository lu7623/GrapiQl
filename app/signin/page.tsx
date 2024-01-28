"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDict } from "../utils/useDictHook";
import { useState } from "react";
import { Form, IFormInput } from "../components/form";
import { SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { MdErrorOutline } from "react-icons/md";
import Link from "next/link";

const Page = () => {
  const { status } = useSession();
  if (status === "authenticated") redirect("/main");
  const [error, setError] = useState("");
  const dict = useDict();
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
  return (
    <>
      <div className="flex flex-col items-center min-h-screen justify-start">
        {error.length > 0 && (
          <div className=" bg-fuchsia-200 w-full h-7 flex justify-center items-center gap-2">
            <MdErrorOutline /> <span>{error}</span> <MdErrorOutline />
          </div>
        )}

        <Form name={dict.login} callback={signin} title={dict.loginTitle} />

        <div>{dict.notHaveAnAccount}</div>
        <Link href="/signup" className=" font-bold text-blue-500 ml-3 mb-10">
          {dict.register}
        </Link>
      </div>
    </>
  );
};

export default Page;
