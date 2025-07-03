"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button, buttonVariants } from "@unlogg/ui/components/button";
import { ShimmerButton } from "@unlogg/ui/components/shimmer-button";
import { cn } from "@unlogg/ui/lib/utils";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="py-16 text-center">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="">
          {/* <Button
            className="mb-4 w-fit rounded-lg border p-2 px-4"
            variant="outline"
            asChild
          >
            <Link href="https://github.com/unlogg/unlogg" target="_blank">
              Give us a <Star className="inline h-5 w-5 stroke-yellow-500" /> on
              Github!{" "}
            </Link>
          </Button> */}
          <Button
            className="mb-4 w-fit rounded-lg border p-2 px-4"
            variant="outline"
            asChild
          >
            <Link href="https://github.com/unlogg/unlogg" target="_blank">
              🛠️ We are building Unlogg! Follow the progress
            </Link>
          </Button>
        </div>

        {isMobile ? (
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-balance md:text-6xl lg:text-6xl">
            The Open Source Jira replacement
          </h1>
        ) : (
          <h1 className="mb-4 max-w-2xl text-5xl font-extrabold tracking-tight text-balance md:text-6xl lg:text-7xl">
            The Open Source Jira replacement
          </h1>
        )}

        {isMobile ? (
          <p
            className="mx-auto mb-8 max-w-3xl text-xl tracking-tight text-gray-600 md:text-2xl dark:text-gray-300"
            style={{
              wordSpacing: "0.0rem",
            }}
          >
            Build and plan your next project with Unlogg, the open source issue
            tracker that keeps it simple and open.
          </p>
        ) : (
          <p
            className="mx-auto mb-8 max-w-3xl text-xl tracking-tight text-gray-600 md:text-2xl dark:text-gray-300"
            style={{
              wordSpacing: "0.0rem",
            }}
          >
            For solo-builders, indie hackers, and small teams. Build and plan
            your next project with Unlogg, the open source issue tracker that
            keeps it simple and open.
          </p>
        )}

        <div className="mb-8 flex flex-row items-center justify-center gap-4 sm:flex-row">
          <div className="bg-secondary/10 rounded-lg p-2 px-4">100% Free</div>
          <div className="bg-secondary/10 rounded-lg p-2 px-4">
            Simple and Essential
          </div>
          <div className="bg-secondary/10 rounded-lg p-2 px-4">Self-host</div>
        </div>
      </div>

      <div className="mx-auto flex w-fit flex-row items-center justify-center gap-4">
        {/* <p>
          <Button variant="link">View roadmap</Button>{" "}
        </p> */}
        <Link href="https://tally.so/r/w8YYbo" target="_blank">
          <ShimmerButton className="shadow-2xl">
            <span className="text-center text-2xl leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-xl dark:from-white dark:to-slate-900/10">
              Get Unlogg
            </span>
          </ShimmerButton>
        </Link>
      </div>

      {/* <div className="relative mt-8">
        <div className="absolute top-1/2 left-1/6 -z-1 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/10 opacity-50 blur-[80px]" />
        <div className="absolute top-1/2 -right-1/6 -z-1 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400/10 opacity-50 blur-[80px]" />
        <div className="bg-background z-20 mx-auto h-[700px] w-6xl rounded-md border-3 border-lime-500/10"></div>
      </div> */}
    </section>
  );
};
