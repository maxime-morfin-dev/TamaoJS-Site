import clsx from "clsx";
import { Play } from "@next/font/google";
import { queryBuilder } from "@/lib/planetscale";
import Form from "./form";
import Link from "next/link";

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

async function getRessources() {
  const data = await queryBuilder
    .selectFrom("ressources")
    .select(["id", "link", "description", "tags"])
    .orderBy("id", "desc")
    .limit(100)
    .execute();

  return data;
}

export default async function Page() {
  let entries = [];

  try {
    entries = await getRessources();
  } catch (error) {
    console.error(error);
  }

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
      <Form />
      <div className="mt-8">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="relative border-[1px] border-white border-opacity-30 rounded-sm px-4 py-2 mb-4 bg-white bg-opacity-20"
          >
            <div className="flex items-center gap-2 before:rounded-full before:w-2 before:h-2 before:bg-white">
              {entry.description}
            </div>
            <Link
              href={entry.link}
              target="_blank"
              className="underline text-sm italic text-blue-400"
            >
              {entry.link}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
