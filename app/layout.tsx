// import "./globals.css";
import "./output.css";
import { Hind_Madurai } from "@next/font/google";
import Sidebar from "@/components/sidebar";

const roboto = Hind_Madurai({
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
    <html lang="en" className={roboto.className}>
      <body className="antialiased lg:flex lg:flex-row mx-12 lg:mx-0relative">
        <Sidebar />
        <main className="my-10">{children}</main>
      </body>
    </html>
  );
}
