"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";

export default function CheckRessource({ entry, isValideUrl }) {
  const [isCheck, setIsCheck] = useState(false);
  useEffect(() => {
    setIsCheck(document.cookie.includes(entry.id) ? true : false);
  }, [entry.id]);

  const handleCookies = () => {
    setIsCheck(!isCheck);
    const cookieToSet = { id: entry.id, isCheck };

    //create an array in cookie with name "ressources" if not exist
    if (!document.cookie.includes("ressources")) {
      document.cookie = `ressources=[${JSON.stringify(cookieToSet)}]`;
    } else {
      //get the array in cookie
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("ressources"))
        .split("=")[1];
      const cookieArray = JSON.parse(cookie);
      //check if the entry is already in the array
      const isAlreadyIn = cookieArray.find((e) => e.id === entry.id);
      //if not, add it
      if (!isAlreadyIn) {
        cookieArray.push(cookieToSet);
        document.cookie = `ressources=${JSON.stringify(cookieArray)}`;
      } else {
        //if yes, remove it
        const newCookieArray = cookieArray.filter((e) => e.id !== entry.id);
        document.cookie = `ressources=${JSON.stringify(newCookieArray)}`;
      }
    }
  };
  return (
    <>
      {isValideUrl ? (
        <div
          className={clsx(
            "w-3 h-3 z-30 absolute top-2 right-2 border-[1px] border-white border-opacity-30 rounded-full cursor-pointer",
            {
              "bg-green-500": isCheck,
            }
          )}
          onClick={(e) => {
            e.preventDefault();
            handleCookies();
          }}
        />
      ) : null}
    </>
  );
}
