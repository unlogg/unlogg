// import { RootProvider } from "fumadocs-ui/provider";
import { DM_Sans, Geist_Mono, Sora } from "next/font/google";
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
  return (
    <html
      lang="en"
      // className={cn(geist.className, geistMono.className)}
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
