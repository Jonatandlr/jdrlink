import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MaxWithWrapper from "@/components/MaxWidthWrapper";
import Provedor from "@/context/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JDRLINK",
  description: "Shorten your links with JDRLINK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MaxWithWrapper>
          <Provedor>{children}</Provedor>
        </MaxWithWrapper>
      </body>
    </html>
  );
}
