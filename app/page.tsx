"use client";

import Image from "next/image";
import avatar from "./avatar.jpg";
import Link from "next/link";
import clsx from "clsx";
import Tags from "@/components/tags";
import { Play } from "@next/font/google";
import { ChatIcon, GithubIcon, TwitterIcon } from "@/components/icons";
import { useEffect, useState } from "react";

export const metadata = {
  description: "React developer sharing stuff",
  openGraph: {
    title: "Tamoa JS",
    description: "React developer sharing stuff",
    url: "https://tamaojs.io",
    siteName: "Tamao JS",
    // images: [
    //   {
    //     url: "https://leerob.io/og.jpg",
    //     width: 1920,
    //     height: 1080,
    //   },
    // ],
    locale: "fr-FR",
    type: "website",
  },
};

const play = Play({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(checkDarkMode);
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-row items-baseline gap-2 mb-8">
        <h1
          className={clsx(
            "text-start lg:text-start text-4xl lg:text-5xl font-medium",
            play.className
          )}
        >
          Tamao
        </h1>
        <p className="w-full italic text-xs lg:text-sm opacity-70">
          @Maxime Morfin
        </p>
      </div>
      <div className="flex flex-col justify-center items-start lg:items-start">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-10">
          <Image
            src={avatar}
            width={150}
            height={150}
            alt="moi"
            className="w-28 h-28 flex justify-center items-center lg:justify-start my-8 rounded-full grayscale "
            priority
            placeholder="blur"
          />
        </div>
      </div>

      <h2>React fullstack developer,</h2>
      <p className="text-md font-medium">
        Learn , Practice, Master ... Reapeat
        <span className="emoji" role="img" aria-label={"🔁"}>
          {"🔁"}
        </span>
      </p>
      <Link href={"/chat"}>
        <div className="flex justify-center items-center gap-2 font-paragraph px-3 py-2 w-fit rounded-sm mt-4 bg-sky-400  text-sm text-white hover:text-base translate-x-0 translate-y-0 transition-all duration-100 ease-linear relative">
          <span className="flex justify-center items-center h-2 w-2 top-0.5 right-0.5 absolute">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <ChatIcon />
          <span>Let&apos;s chat</span>
        </div>
      </Link>
      <div className="w-full lg:max-w-lg opacity-70 h-[1px] bg-slate-100 mt-4 ml-0" />
      <p className="font-paragraph text-sm my-8 md:max-w-lg md:text-lg lg:text-base">
        Hi !{" "}
        <span className="emoji" role="img" aria-label={"👋"}>
          {"👋"}
        </span>
        I am Maxime Morfin, a talented fullstack developer with 5 years of
        experience in the industry.{" "}
        <span className=" text-sky-400">
          I am a self-taught expert in React and Next.js
        </span>{" "}
        and have a passion for sharing my knowledge with others.
      </p>
      <p className="font-paragraph text-sm my-8 md:max-w-lg md:text-lg lg:text-base">
        {" "}
        My goal is to educate and inspire others by offering courses and sharing
        valuable information about the cutting-edge field of Web 3 and
        JavaScript. With my skills and passion for technology, I am poised to
        make a significant impact in the tech community.
      </p>
      <div className="flex flex-col justify-center items-start gap-1 mb-8">
        <div className="flex justify-start items-center gap-2 font-paragraph text-sm opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out">
          <TwitterIcon />
          <Link
            href={"https://twitter.com/Tamao_ev"}
            className="hover:underline"
            target="_blank"
          >
            <span>Follow me on Twitter</span>
          </Link>
        </div>
        <div className="flex justify-start mb-8 items-center gap-2 font-paragraph text-sm opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out">
          <GithubIcon />
          <Link
            href={"https://github.com/maxime-morfin-dev"}
            className="hover:underline"
            target="_blank"
          >
            <span>My projects on Github</span>
          </Link>
        </div>
      </div>
    </>
  );
}
