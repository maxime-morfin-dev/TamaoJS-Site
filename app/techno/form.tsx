"use client";

import { AddIcon } from "@/components/icons";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { isErrored } from "stream";

export default function Form() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [value, setValue] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [errorTextarea, setErrorTextarea] = useState(false);
  const [isPending, startTranstion] = useTransition();
  const isMutating = isFetching || isPending;

  useEffect(() => {
    const checkDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(checkDarkMode);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    const textarea = form.elements.namedItem(
      "description"
    ) as HTMLTextAreaElement;

    if (textarea.value === "") {
      setErrorTextarea(true);
      return;
    }

    setIsFetching(true);
    const res = await fetch("/api/ressources", {
      body: JSON.stringify({
        link: input.value,
        description: textarea.value,
      }),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    input.value = "";
    textarea.value = "";

    if (res.status === 200) {
      setIsFetching(false);
      setIsDescription(false);
      setIsSend(true);
      startTranstion(() => {
        router.refresh();
      });
    }
  }

  return (
    <form
      style={{ opacity: !isMutating ? 1 : 0.7 }}
      className="max-w-[500px] text-sm flex flex-col justify-start items-start w-full"
      onSubmit={onSubmit}
    >
      <div
        className={clsx("flex gap-1 justify-start items-center w-full", {
          "opacity-30": isDescription,
        })}
      >
        <input
          type="text"
          aria-label="Enter url"
          placeholder="Enter the ressource url"
          name="search"
          className={clsx("mt-8 py-1 pl-3 w-full h-8 rounded-sm text-sm", {
            "border-red-500 border-2": errorInput,
          })}
          onChange={(e) => setValue(e.target.value)}
          disabled={isPending || isDescription}
          onFocus={() => setIsSend(false)}
        />
        <div
          className="bg-slate-500 bg-opacity-30 hover:bg-opacity-50 dark:bg-slate-100 dark:bg-opacity-30 hover:dark:bg-opacity-50 h-8 w-8 mt-8 flex justify-center items-center rounded-sm"
          onClick={() => {
            if (value || value !== "") {
              setIsDescription(true);
              setErrorInput(false);
            } else {
              setErrorInput(true);
            }
          }}
        >
          <AddIcon color={`${isDarkMode ? "white" : "rgb(100 116 139)"}`} />
        </div>
      </div>
      {errorInput && (
        <p className="text-red-500 text-xs mt-1 italic">
          * You must add an url
        </p>
      )}
      {isSend && (
        <div className="bg-green-500 bg-opacity-50 h-8 w-full mt-4 flex justify-center items-center rounded-sm">
          Thank you ! {""}
        </div>
      )}
      {isDescription && (
        <div className="w-full ">
          <textarea
            aria-label="Enter description"
            placeholder="Enter a description for this ressource"
            name="description"
            rows={5}
            className={clsx("mt-8 py-1 pl-3 w-full h-auto rounded-sm text-sm", {
              "border-red-500 border-2": errorTextarea,
            })}
            disabled={isPending}
          />
          {errorTextarea && (
            <p className="text-red-500 text-xs my-1 italic">
              * You must add a description !
            </p>
          )}
          <button
            className="bg-slate-500 bg-opacity-30 hover:bg-opacity-50 dark:bg-slate-100 dark:bg-opacity-30 hover:dark:bg-opacity-50 h-8 w-full mt-1 flex justify-center items-center rounded-sm"
            disabled={isMutating}
          >
            send {""}
          </button>
        </div>
      )}
    </form>
  );
}
