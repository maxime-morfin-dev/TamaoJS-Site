"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import Link from "next/link";
import { LangIcon, MoonIcon, SunIcon } from "./icons";
import { useState } from "react";

const navigationItems = {
  "/": {
    label: "Home",
    x: 9,
    y: 17,
    w: "51px",
  },
  "/chat": {
    label: "Chat",
    x: 68,
    y: 50,
    w: "42px",
  },
  "/ressources": {
    label: "Ressources",
    x: 117,
    y: 85,
    w: "86px",
  },
  "/shortcuts": {
    label: "Shortcuts",
    x: 212,
    y: 120,
    w: "76px",
  },
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isLight, setIsLight] = useState(false);

  return (
    <aside className="lg:h-screen lg:w-1/4 lg:flex lg:flex-col lg:justify-start lg:items-center font-paragraph relative">
      <div className="my-10 flex lg:flex-col justify-between lg:justify-center items-center lg:items-start lg:gap-7">
        <div className="lg:-translate-x-2">Logo</div>
        <nav
          className="flex flex-row md:flex-col items-start fade ml-0"
          id="nav"
        >
          <div className="flex lg:flex-col -ml-5 space-x-2 my-2 relative">
            {navigationItems[pathname] ? (
              <>
                {/* Desktop version, hidden on mobile, animates y axis */}
                <div className="hidden lg:block relative ">
                  <motion.div
                    className="absolute bg-neutral-100 bg-opacity-30 h-[10px] left-[9px] rounded-sm z-[-1]"
                    layoutId="test2"
                    initial={{ opacity: 0, y: navigationItems[pathname].y }}
                    animate={{
                      opacity: 1,
                      y: navigationItems[pathname].y,
                      width: navigationItems[pathname].w,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                </div>
                {/* Mobile version, hidden on desktop, animates x axis */}
                <div className="block lg:hidden">
                  <motion.div
                    className="absolute bg-neutral-100 bg-opacity-30 h-[22px] top-1.5 rounded-sm z-[-1]"
                    layoutId="test"
                    initial={{ opacity: 0, x: navigationItems[pathname].x }}
                    animate={{
                      opacity: 1,
                      x: navigationItems[pathname].x,
                      width: navigationItems[pathname].w,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                </div>
              </>
            ) : null}

            {Object.entries(navigationItems).map(([path, { label }]) => {
              const isActive = path === pathname;

              return (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    "transition-all hover:text-neutral-200 py-[5px] px-[5px]",
                    {
                      "text-neutral-500": !isActive,
                      "font-medium": isActive,
                    }
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
        <div>
          <div
            className="bg-white text-xs bg-opacity-10 p-2 rounded-sm cursor-pointer relative flex gap-2 lg:-translate-x-2"
            onClick={() => setIsLight(!isLight)}
          >
            {!isLight ? <SunIcon /> : <MoonIcon />}
          </div>
        </div>
      </div>
    </aside>
  );
}
