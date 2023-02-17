import { usePathname } from "next/navigation";

export default function Tags() {
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
    <div className="flex justify-start items-center w-full lg:h-fit my-8 gap-3 flex-wrap lg:max-w-sm">
      {technoItems.map((item, index) => (
        <div
          key={index}
          className="px-4 rounded-sm bg-slate-500 text-white dark:bg-white bg-opacity-70 dark:bg-opacity-80 :hover:dark:bg-opacity-100 hover:bg-opacity-100 transition-all duration-300 ease-in-out hover:cursor-pointer dark:text-black text-sm font-medium"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
