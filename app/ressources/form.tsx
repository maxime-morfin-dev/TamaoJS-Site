"use client";

import { AddIcon } from "@/components/icons";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const options = [
  { value: "react", label: "React" },
  { value: "vuejs", label: "VueJs" },
  { value: "nodejs", label: "NodeJs" },
  { value: "funny", label: "Funny" },
  { value: "blockchaine", label: "Blockchaine" },
  { value: "mlearning", label: "M.Learing" },
];

const colorStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "black",
    borderColor: "gray",
    boxShadow: "none",
    "&:hover": {
      borderColor: "gray",
    },
    borderRadius: "2px",
  }),
  input: (styles: any) => ({ ...styles, color: "white" }),
  menu: (styles: any) => ({
    ...styles,
    backgroundColor: "black",
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? "white"
        : isFocused
        ? "gray"
        : null,
      borderRadius: "2px",
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? "white"
        : isFocused
        ? "white"
        : "white",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  multiValue: (styles: any, { data }: any) => {
    const color = "gray";
    return {
      ...styles,
      backgroundColor: color,
      borderRadius: "2px",
    };
  },
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles: any, { data }: any) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: "white",
      color: "gray",
    },
  }),
};

const animatedComponents = makeAnimated();

export default function Form() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isTag, setIsTag] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [value, setValue] = useState("");
  const [valueTextArea, setValueTextArea] = useState("");
  const [valueSelect, setValueSelect] = useState([]);
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

  const handleChange = (selectedOption: any) => {
    setValueSelect(selectedOption);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    const textarea = form.elements.namedItem(
      "description"
    ) as HTMLTextAreaElement;
    const tags = valueSelect.map((item: any) => item.label);

    setIsFetching(true);
    const res = await fetch("/api/ressources", {
      body: JSON.stringify({
        link: input.value,
        description: textarea.value,
        tags: JSON.stringify(tags),
        isValideUrl: false,
      }),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    input.value = "";
    textarea.value = "";
    setValueSelect([]);

    if (res.status === 200) {
      setIsFetching(false);
      setIsDescription(false);
      setIsTag(false);
      setIsSend(true);
      startTranstion(() => {
        router.refresh();
      });
    }
  }

  return (
    <form
      style={{ opacity: !isMutating ? 1 : 0.7 }}
      className="text-sm flex flex-col justify-start items-start w-full"
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
          autoComplete="off"
          className={clsx("mt-8 py-1 pl-3 w-full h-8 rounded-sm text-sm", {
            "border-red-500 border-2": errorInput,
          })}
          onChange={(e) => setValue(e.target.value)}
          disabled={isPending || isDescription}
          onFocus={() => setIsSend(false)}
        />
        <div
          className={clsx(
            " bg-slate-100 bg-opacity-30 hover:bg-opacity-50 h-8 w-8 mt-8 flex justify-center items-center rounded-sm",
            { "hover:cursor-not-allowed": isDescription }
          )}
          onClick={() => {
            if (
              (value || value !== "") && //controle if value start with https://
              value.startsWith("https://")
            ) {
              setIsDescription(true);
              setErrorInput(false);
            } else {
              setErrorInput(true);
            }
          }}
        >
          <AddIcon />
        </div>
      </div>
      {errorInput && (
        <p className="text-red-500 text-xs mt-1 italic">
          * You must add an url starting with https://
        </p>
      )}
      {isSend && (
        <div className="bg-green-500 bg-opacity-50 h-8 w-full mt-4 flex justify-center items-center rounded-sm">
          Thank you ! {""}
        </div>
      )}
      {isDescription && (
        <div
          className={clsx("w-full", {
            "opacity-30": isTag,
          })}
        >
          <textarea
            aria-label="Enter description"
            placeholder="Enter a description for this ressource"
            name="description"
            rows={5}
            className={clsx("mt-8 py-1 pl-3 w-full h-auto rounded-sm text-sm", {
              "border-red-500 border-2": errorTextarea,
            })}
            onChange={(e) => setValueTextArea(e.target.value)}
            disabled={isTag}
          />
          {errorTextarea && (
            <p className="text-red-500 text-xs my-1 italic">
              * You must add a description !
            </p>
          )}
          <div
            className={clsx(
              " bg-slate-100 bg-opacity-30 hover:bg-opacity-50 h-8 w-full mt-1 flex justify-center items-center rounded-sm",
              { "hover:cursor-not-allowed opacity-30": isTag }
            )}
            onClick={() => {
              if (valueTextArea || valueTextArea !== "") {
                setIsTag(true);
                setErrorTextarea(false);
              } else {
                setErrorTextarea(true);
              }
            }}
          >
            next {""}
          </div>
        </div>
      )}
      {isTag && (
        <>
          <div className="w-full my-4">
            <Select
              options={options}
              isMulti
              styles={colorStyles}
              components={animatedComponents}
              onChange={handleChange}
              isDisabled={isPending}
              placeholder="Select tags ..."
            />
          </div>
          <button
            type="submit"
            className=" bg-slate-100 bg-opacity-30 hover:bg-opacity-50 h-8 w-full mt-1 flex justify-center items-center rounded-sm"
            disabled={isMutating}
          >
            Send {""}
          </button>
        </>
      )}
    </form>
  );
}
