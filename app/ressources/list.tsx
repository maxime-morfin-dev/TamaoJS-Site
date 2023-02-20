"use client";
import Link from "next/link";
import CheckRessource from "@/components/ressources/checkRessource";
import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Form from "@/app/ressources/form";

export const dynamic = "force-dynamic";

export default function List({ entries }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterTagState, setFilterTagState] = useState<string[]>([]);
  const [filterBySearchState, setFilterBySearchState] = useState<string>("");
  // const [entriesState, setEntriesState] = useState(entries);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const path = usePathname();

  let technoItems: string[] = [];
  if (path === "/") {
    technoItems = [
      "React",
      "NextJs",
      "NodeJS",
      "Flutter",
      "C#",
      "TypeScript",
      "VueJs",
      "Blockchaine",
      "M.Learning",
    ];
  } else {
    technoItems = [
      "React",
      "NodeJS",
      "VueJs",
      "Funny",
      "Blockchaine",
      "M.Learning",
    ];
  }

  return (
    <div className="my-8">
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2">
          <div
            className=" before:absolute before:h-full before:bg-slate-100  before:w-full before:bottom-0 before:opacity-30 before:content-[''] before:-translate-x-3 before:translate-y-8 hover:before:translate-y-0 before:rounded-sm before:transition before:duration-300 before:ease-in-out rounded-sm text-base relative px-3 overflow-hidden hover:cursor-pointer w-fit border-[1px] border-slate-100 border-opacity-30"
            onClick={() => {
              setIsSearch(!isSearch);
              setIsFilter(false);
              setIsAdd(false);
            }}
          >
            {isSearch ? `x` : `search`}
          </div>
          <div
            className=" before:absolute before:h-full before:bg-slate-100 before:w-full before:bottom-0 before:opacity-30 before:content-[''] before:-translate-x-3 before:translate-y-6 hover:before:translate-y-0 before:rounded-sm before:transition before:duration-300 before:ease-in-out rounded-sm text-base relative px-3 overflow-hidden hover:cursor-pointer w-fit border-[1px] border-slate-100 border-opacity-30"
            onClick={() => {
              setIsFilter(!isFilter);
              setIsSearch(false);
              setIsAdd(false);
              setFilterTagState([]);
            }}
          >
            {isFilter ? `x` : `filter`}
          </div>
        </div>
        <div
          className=" before:absolute before:h-full  before:bg-slate-100 before:w-full before:bottom-0 before:opacity-30 before:content-[''] before:-translate-x-3 before:translate-y-6 hover:before:translate-y-0 before:rounded-sm before:transition before:duration-300 before:ease-in-out rounded-sm text-base relative px-3 overflow-hidden hover:cursor-pointer w-fit border-[1px] border-slate-100 border-opacity-30"
          onClick={() => {
            setIsAdd(!isAdd);
            setIsFilter(false);
            setIsSearch(false);
          }}
        >
          {isAdd ? `x` : `add`}
        </div>
      </div>

      {/* TODO: Mettre un frame motion sur le form */}
      {isSearch && (
        <div className="text-sm flex justify-start items-center gap-1 w-full">
          <input
            type="text"
            aria-label="Type a word or sentence"
            placeholder="Type a word or sentence"
            name="search"
            onChange={(e) => setFilterBySearchState(e.target.value)}
            className="mt-8 py-1 pl-3 w-full h-8 rounded-sm text-sm"
            autoComplete="off"
          />
          <div className=" hover:bg-opacity-50 bg-slate-100 bg-opacity-30 h-8 w-8 mt-8 flex justify-center items-center rounded-sm">
            <SearchIcon />
          </div>{" "}
        </div>
      )}
      {isFilter && (
        <div className="flex justify-start items-center w-full lg:h-fit my-8 gap-3 flex-wrap">
          {technoItems.map((item, index) => (
            <div
              key={index}
              className={`px-4 rounded-sm  transition-all duration-300 ease-in-out hover:cursor-pointer text-sm font-medium ${
                filterTagState.includes(item)
                  ? " bg-white bg-opacity-30 text-white"
                  : "  bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800"
              }`}
              onClick={() => {
                if (!filterTagState.includes(item)) {
                  setFilterTagState([...filterTagState, item]);
                } else {
                  setFilterTagState(filterTagState.filter((t) => t !== item));
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      {isAdd && <Form />}
      {entries
        .filter(
          (e) =>
            e.description.toLowerCase().includes(filterBySearchState) ||
            e.link.toLowerCase().includes(filterBySearchState)
        )
        .filter((e) =>
          filterTagState.length > 0
            ? e.tags.filter((tag) => filterTagState.includes(tag)).length > 0
            : true
        )
        .map((entry) => (
          <Link
            href={entry.link}
            target="_blank"
            key={entry.id}
            //desable click if entry.isValideUrl is false
            onClick={(e) => {
              if (!entry.isValideUrl) {
                e.preventDefault();
              }
            }}
          >
            <div
              className={clsx(
                "relative border-[1px] border-white border-opacity-30 rounded-sm px-4 py-2 my-4 bg-white bg-opacity-10",
                {
                  "opacity-50 cursor-not-allowed": !entry.isValideUrl,
                }
              )}
            >
              <CheckRessource entry={entry} isValideUrl={entry.isValideUrl} />
              <div className="flex justify-between items-center">
                <div className="flex items-center  before:rounded-full ">
                  {entry.description.length > 50
                    ? entry.description.substring(0, 50) + "..."
                    : entry.description}
                </div>
                {!entry.isValideUrl && (
                  <div className="text-[.7em] mt-2 italic bg-green-500 bg-opacity-50 w-fit px-2 py-1 animate-pulse">
                    Awaiting verification ...{" "}
                  </div>
                )}
              </div>
              <div className="mt-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-white bg-opacity-10 rounded-sm px-2 py-1 text-xs mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
