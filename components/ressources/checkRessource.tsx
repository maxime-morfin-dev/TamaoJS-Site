"use client";

import clsx from "clsx";
import { useState } from "react";

export default function CheckRessource({ entry }) {
  const [isCheck, setIsCheck] = useState(
    // check if entry is already in cookie
    typeof document !== "undefined" && document.cookie.includes(entry.id)
  );
  return (
    <div
      className={clsx(
        "w-3 h-3 absolute top-2 right-2 border-[1px] border-white border-opacity-30 rounded-full cursor-pointer",
        {
          "bg-green-500": isCheck,
        }
      )}
      onClick={() => {
        setIsCheck(!isCheck);
        const isRead = document.cookie.includes(entry.id);
        if (isRead) {
          document.cookie = `${entry.id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        } else {
          document.cookie = `${entry.id}=true; path=/;`;
        }
      }}
    />
  );
}
