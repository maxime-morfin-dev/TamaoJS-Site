// import "./globals.css";
import "./output.css";
import { Montserrat } from "@next/font/google";
import Sidebar from "@/components/sidebar";

const montserrat = Montserrat({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Tamao JS",
    template: "%s | Tamao JS",
  },
  incons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="antialiased lg:flex lg:flex-row mx-12 lg:mx-0 text-slate-700 dark:text-white relative">
        <Sidebar />
        <main className="my-10">{children}</main>
      </body>
    </html>
  );
}
