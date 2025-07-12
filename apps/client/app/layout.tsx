import {
  DM_Sans,
  Geist,
  Geist_Mono,
  Public_Sans,
  Sora,
} from "next/font/google";
import "./global.css";
// import "@unlogg/ui/globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/header/site-header";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${sora.variable}  font-sans antialiased`}
      >
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
