import { SearchIcon, SendIcon } from "@/components/icons";

export default function Form() {
  return (
    <form className="text-sm flex justify-start items-center gap-1 w-full">
      <input
        type="text"
        aria-label="Enter a message"
        placeholder="Enter a message"
        name="search"
        className="mt-8 py-1 pl-3 w-full h-8 rounded-sm text-sm"
        autoComplete="off"
      />
      <div className=" hover:bg-opacity-50 bg-teal-700 h-8 w-8 mt-8 flex justify-center items-center rounded-sm">
        <SendIcon />
      </div>{" "}
    </form>
  );
}
