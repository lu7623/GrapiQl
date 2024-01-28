"use client";
import Link from "next/link";
import Image from "next/image";

import { H1, USUAL_BTN } from "./styles/uni-classes";
import { useDict } from "./utils/useDictHook";
import { useState } from "react";
import PersonCard from "./components/person-card";
import PersonDetailes from "./components/person-details";
import BigPopup from "./components/popup";
import { useSession } from "next-auth/react";

export default function Home() {
  const dict = useDict();
  const [isOpen, setIsOpen] = useState<number | false>(false);
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <main className="flex flex-col items-center sm:mx-10 py-3 mx-5">
      {!isAuthenticated ? (
        <div className="md:flex md:items-center md:justify-end w-full leading-6 text-right">
          {dict.youAreNotAuth1}
          <Link href="/signin" className={USUAL_BTN + " mx-1 md:mx-2"}>
            {dict.login}
          </Link>{" "}
          {dict.or}{" "}
          <Link
            href="/signup"
            className={USUAL_BTN + " whitespace-nowrap mx-2"}
          >
            {dict.register}
          </Link>
          {dict.youAreNotAuth2}
        </div>
      ) : (
        <div className="flex items-center justify-end w-full">
          {dict.youAreAuth1}
          <Link href="/main" className={USUAL_BTN + " mx-2"}>
            {dict.mainPage}
          </Link>
          {dict.youAreAuth2}
        </div>
      )}
      <h1 className={H1}>{dict.welcomePage}</h1>
      <div className="flex flex-col xl:flex-row xl:columns-3 gap-x-4 py-3">
        {dict.persons.map((person, index) => (
          <PersonCard
            key={person.name}
            name={person.name}
            role={person.role}
            photoUrl={person.photoUrl}
            githubUrl={person.githubUrl}
            onClick={() => {
              setIsOpen(index);
            }}
          />
        ))}
      </div>
      <div className="py-3">
        <div className="block max-[392px]:pt-5 pb-2">
          {dict.welcDesc}
          <span className=" font-bold block">{dict.stack}</span>
          <p>{dict.stackDesc}</p>
          <span className="font-bold ">{dict.coord}</span>
          <p>{dict.coordDesc}</p>
          <span className="font-bold ">{dict.quality}</span>
          <p>{dict.qualityDesc} </p>
        </div>
      </div>
      {typeof isOpen === "number" && (
        <BigPopup
          onClose={(event) => {
            event.preventDefault();
            setIsOpen(false);
          }}
        >
          <PersonDetailes
            name={dict.persons[isOpen].name}
            role={dict.persons[isOpen].role}
            photoUrl={dict.persons[isOpen].photoUrl}
            githubUrl={dict.persons[isOpen].githubUrl}
            description={dict.persons[isOpen].description}
            contributions={dict.persons[isOpen].contributions}
          />
        </BigPopup>
      )}

      <p className="flex gap-x-4 items-center">
        <Link href={"https://rs.school/react/"} className="inline-block">
          <Image
            src={"https://rs.school/images/rs_school_js.svg"}
            width={120}
            height={60}
            alt={"RS School"}
          />
        </Link>
        <span className={H1}>React Course</span>
      </p>
    </main>
  );
}
