import clsx from "clsx";
import { Play } from "@next/font/google";
import Form from "./form";

const play = Play({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const metadata = {
  title: "Chat",
  description: "Discussion around web development",
};

export default function Page({}) {
  return (
    <>
      <h1
        className={clsx(
          "mb-8 w-full text-start lg:text-start text-4xl lg:text-5xl font-medium",
          play.className
        )}
      >
        Chat
      </h1>
      <h2 className="font-paragraph text-lg mt-8 md:max-w-lg md:text-lg lg:text-lg">
        Discussion around web development
      </h2>
      <p className="font-paragraph text-sm md:max-w-lg md:text-lg lg:text-lg">
        This place is meant for exchanging on topics related to web development.
        Do not hesitate to ask your questions or to start a debate!
      </p>
      <Form />
    </>
  );
}
