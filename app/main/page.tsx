"use client";

import { USUAL_BTN } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { signOut, useSession } from "next-auth/react";
import { db } from "../firebase";
import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export const Page = () => {
  const dict = useDict();
  const { data: session, status } = useSession();
  const [users] = useCollection(query(collection(db, "users")));
  return (
    <>
      <div>{dict.mainPage}</div>
      <ul>
        {users &&
          users.docs.map((x) => <li key={x.data().name}>{x.data().email}</li>)}
      </ul>
      <div>{status + session?.user?.email}</div>
      <button
        className={USUAL_BTN}
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        {dict.logout}
      </button>
    </>
  );
};

export default Page;
Page.requireAuth = true;
