"use client";
import Link from "next/link";
import Image from "next/image";
import { USUAL_BTN } from "./styles/uni-classes";
import { useDict } from "./utils/useDictHook";

export default function NotFound() {
  const dict = useDict();

  return (
    <div className="flex flex-col items-center mx-auto my-4 p-6 rounded-xl min-h-screen">
      <Image src="/error.svg" alt="error" width={300} height={400} priority />
      <h2 className=" my-2 font-bold md:text-xl text-lg">{dict.notFound}</h2>
      <p className=" my-2">{dict.notFoundDesc}</p>
      <p>
        {dict.goTo}
        <Link href="/">
          <button className={USUAL_BTN + " mx-2"}>{dict.welcomePage}</button>
        </Link>
      </p>
    </div>
  );
}
