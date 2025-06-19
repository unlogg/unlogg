export const siteConfig = {
  name: "unlogg",
  creator: "@unlogg",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://unlogg.com",
  ogImage: "https://unlogg.com/opengraph-image.png",
  description:
    "unlogg is a open-source web analytics platform that provides real-time insights into your website's performance, user behavior, and traffic sources. It offers a comprehensive suite of tools for tracking and analyzing web data, enabling you to make informed decisions to optimize your online presence.",
  title: "unlogg - Open Source Web Analytics Platform",
  keywords: [
    "unlogg",
    "web analytics",
    "analytics",
    "real-time analytics",
    "Open Source",
    "shadcn/ui",
  ],
  links: {
    portfolio: "https://unlogg.com",
    github: "https://github.com/unlogg-labs/unlogg",
  },
  githubBaseUrl: "https://github.com",
  githubOwner: "unlogg",
  githubRepo: "unlogg",
};

export type SiteConfig = typeof siteConfig;
