import type { Metadata } from "next";
import NavbarMobile from "@/components/NavbarMobile/NavbarMobile";
import Image from "next/image";

import { inter } from "@/assets/fonts/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Lente Serrano",
  description: "Lente Serrano - Fotografía y videografía",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="header">
          <Image
            src="/logo-cropped.svg"
            alt="Header Image"
            width={150}
            height={50}
            objectFit="contain"
          />
        </div>
        <div className="page-container">{children}</div>
        <div className="navbar-container">
          <NavbarMobile />
        </div>
      </body>
    </html>
  );
}
