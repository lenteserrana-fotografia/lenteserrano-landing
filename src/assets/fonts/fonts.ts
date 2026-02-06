import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Define weights if the font isn't variable
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "auto",
});
