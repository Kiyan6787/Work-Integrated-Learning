import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../public/styles/globals.css";
import Provider from "../lib/context/AuthContext";
import ToasterContext from "../lib/context/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Work Integrated Learning Management System",
  description: "Work Integrated Learning Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children} </Provider>
        <ToasterContext />
      </body>
    </html>
  );
}
