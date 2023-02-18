"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";

export default function FormSearch() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const checkDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(checkDarkMode);
  }, []);
  return (
    <form className="max-w-[500px] text-sm flex justify-start items-center gap-1 w-full">
      <input
        type="text"
        aria-label="Type a word or sentence"
        placeholder="Type a word or sentence"
        name="search"
        className="mt-8 py-1 pl-3 w-full h-8 rounded-sm text-sm"
      />
      <button className=" bg-slate-100 bg-opacity-30 hover:bg-opacity-50 h-8 w-8 mt-8 flex justify-center items-center rounded-sm">
        <SearchIcon />
      </button>{" "}
    </form>
  );
}
