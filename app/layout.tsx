import "./globals.css";

import Providers from "@/core/components/providers/providers";
import { notoSans, notoSansMono } from "@/core/configs/fonts";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "ChatIO",
  description: "Random chat to anonymous people",
};

export const viewport: Viewport = {
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${notoSans.variable} ${notoSansMono.variable}`} lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
