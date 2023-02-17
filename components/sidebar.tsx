"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import Link from "next/link";

const navigationItems = {
  "/": {
    label: "Home",
    x: 8,
    y: 30,
    w: "60px",
  },
  "/blog": {
    label: "Blog",
    x: 76,
    y: 65,
    w: "50px",
  },
  "/ressources": {
    label: "Ressources",
    x: 132,
    y: 99,
    w: "100px",
  },
  "/shortcuts": {
    label: "Shortcuts",
    x: 240,
    y: 132,
    w: "83px",
  },
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:h-screen lg:w-1/4 lg:flex lg:flex-col lg:justify-start lg:items-center font-paragraph ">
      <div className="my-10 flex lg:flex-col justify-start lg:justify-center items-center lg:items-start flex-wrap gap-12 lg:gap-7">
        <div>Logo</div>
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
                    className="absolute bg-slate-500 dark:bg-neutral-100 bg-opacity-30 dark:bg-opacity-30 h-[2px] left-2 rounded-sm z-[-1]"
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
                    className="absolute bg-slate-500 dark:bg-neutral-100 bg-opacity-30 dark:bg-opacity-30 h-[2px] -bottom-0.5 rounded-sm z-[-1]"
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
                    "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-[5px] px-[5px]",
                    {
                      "text-neutral-500": !isActive,
                      "font-semibold": isActive,
                    }
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
