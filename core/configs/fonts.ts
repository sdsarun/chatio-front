import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";

export const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"]
});

export const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"]
})