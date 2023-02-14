"use client";

import clsx from "clsx";
import { Play } from "@next/font/google";
import { useState } from "react";
import Form from "./form";
import FormSearch from "./formSearch";
import Tags from "@/components/tags";
import { queryBuilder } from "@/lib/planetscale";

const play = Play({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const metadata = {
  title: "Technos",
  description:
    "Gathering in one place of useful links and articles for javascript development",
};

export default function Page({}) {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  return (
    <>
      <div className=" mb-8">
        <h1
          className={clsx(
            "w-full text-start lg:text-start text-4xl lg:text-5xl font-medium",
            play.className
          )}
        >
          Techno
        </h1>
      </div>
      <p className="font-paragraph text-sm my-8 md:max-w-lg md:text-lg lg:text-lg">
        Gathering in one place of{" "}
        <span className="font-semibold">useful links and articles</span> for
        javascript development
      </p>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2">
          <div
            className=" before:absolute before:h-full before:dark:bg-slate-100 before:bg-slate-500  before:w-full before:bottom-0 before:opacity-30 before:content-[''] before:-translate-x-3 before:translate-y-8 hover:before:translate-y-0 before:rounded-sm before:transition before:duration-300 before:ease-in-out rounded-sm text-base relative px-3 overflow-hidden hover:cursor-pointer w-fit border-[1px] dark:border-slate-100 dark:border-opacity-30"
            onClick={() => {
              setIsSearch(true);
              setIsFilter(false);
              setIsAdd(false);
            }}
          >
            search
          </div>
          <div
            className=" before:absolute before:h-full before:bg-slate-500 before:dark:bg-slate-100 before:w-full before:bottom-0 before:opacity-30 before:content-[''] before:-translate-x-3 before:translate-y-6 hover:before:translate-y-0 before:rounded-sm before:transition before:duration-300 before:ease-in-out rounded-sm text-base relative px-3 overflow-hidden hover:cursor-pointer w-fit border-[1px] dark:border-slate-100 dark:border-opacity-30"
            onClick={() => {
              setIsFilter(true);
              setIsSearch(false);
              setIsAdd(false);
            }}
          >
            filter
          </div>
        </div>
        <div
          className=" before:absolute before:h-full before:bg-slate-500 before:dark:bg-slate-100 before:w-full before:bottom-0 before:opacity-30 before:content-[''] before:-translate-x-3 before:translate-y-6 hover:before:translate-y-0 before:rounded-sm before:transition before:duration-300 before:ease-in-out rounded-sm text-base relative px-3 overflow-hidden hover:cursor-pointer w-fit border-[1px] dark:border-slate-100 dark:border-opacity-30"
          onClick={() => {
            setIsAdd(true);
            setIsFilter(false);
            setIsSearch(false);
          }}
        >
          add
        </div>
      </div>

      {/* TODO: Mettre un frame motion sur le form */}
      {isSearch && <FormSearch />}
      {isFilter && <Tags />}
      {isAdd && <Form />}
    </>
  );
}
