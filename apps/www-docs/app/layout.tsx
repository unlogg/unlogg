// import { RootProvider } from "fumadocs-ui/provider";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { DM_Sans, Geist_Mono, Sora } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import "./global.css";
import { Provider } from "./provider";

const geistSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export default function Layout({ children }: { children: ReactNode }) {
  const isDev = process.env.NODE_ENV === "development";
  return (
    <html
      lang="en"
      // className={cn(geist.className, geistMono.className)}
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
      suppressHydrationWarning
      data-website-id="38715b20-2b6e-4231-9ace-019c14355a98"
    >
      {!isDev ? (
        <Script
          async
          src="https://cloud.umami.is/script.js"
          data-website-id="38715b20-2b6e-4231-9ace-019c14355a98"
        />
      ) : null}
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  description: "Official documentation for unlogg",
  metadataBase: new URL(siteConfig.url),
  title: "unlogg",
};
