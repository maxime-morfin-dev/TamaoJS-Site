import clsx from "clsx";
import { Play } from "@next/font/google";
import { queryBuilder } from "@/lib/planetscale";
import List from "@/app/ressources/list";

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
    .select(["id", "link", "description", "tags", "isValideUrl"])
    .orderBy("isValideUrl", "desc")
    .orderBy("id", "asc")
    .limit(100)
    .execute();

  return data;
}
export const dynamic = "force-dynamic";

export default async function Page() {
  let entries = [];

  try {
    entries = await getRessources();
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <h1
        className={clsx(
          "mb-8 w-full text-start lg:text-start text-4xl lg:text-5xl font-medium",
          play.className
        )}
      >
        Ressources
      </h1>
      <p className="font-paragraph text-sm my-8 md:max-w-lg md:text-lg lg:text-lg">
        Gathering in one place of{" "}
        <span className="">useful links and articles</span> for javascript
        development
      </p>
      <List entries={entries} />
    </>
  );
}
