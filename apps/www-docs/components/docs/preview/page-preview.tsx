"use client";

import { Button } from "@unlogg/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@unlogg/ui/components/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@unlogg/ui/components/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@unlogg/ui/components/tabs";
import { siteConfig } from "@/config/site";
import { cn } from "@unlogg/ui/lib/utils";
import { ArrowUpRight, CheckCheck, Ellipsis, Terminal } from "lucide-react";
import { useState } from "react";
import type { ComponentPreviewProps, PagePreviewProps } from "types/component";
import { ComponentLoader } from "../component-loader";
import { ComponentCodePreview } from "./component-preview-code";
import { PageCodePreview } from "./page-preview-code";

const prePath =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      siteConfig.url;

export function PagePreview({
  classNameComponentContainer,
  hasReTrigger = false,
  name,
  source,
}: PagePreviewProps) {
  const [activeTab, setActiveTab] = useState("preview");

  // Get the mainFile fromt the source so we can set the selected file
  const mainFile = Object.keys(source).find((key) => source[key].isMainFile);

  const [selectedFile, setSelectedFile] = useState(
    Object.keys(source).length > 0 ? mainFile : ""
  );

  console.log("selectedFile", selectedFile);
  const [isTerminalCopied, setIsTerminalCopied] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState("");

  const handleCopyCommand = (commandType: string) => {
    let command = "";
    command = `npx shadcn@latest add ${prePath}/r/${name}.json`;

    navigator.clipboard.writeText(command);
    setCopiedCommand(commandType);
    setIsTerminalCopied(true);
    setTimeout(() => {
      setIsTerminalCopied(false);
      setCopiedCommand("");
    }, 1000);
  };

  const handleTerminalClick = () => {
    const COPY = `npx shadcn@latest add ${prePath}/r/${name}.json`;
    navigator.clipboard.writeText(COPY);
    setIsTerminalCopied(true);
    setTimeout(() => {
      setIsTerminalCopied(false);
    }, 1000);
  };

  const renderTerminalButton = () => {
    return (
      <Button
        size="sm"
        onClick={handleTerminalClick}
        variant="outline"
        className="relative"
      >
        {isTerminalCopied ? (
          <>
            <CheckCheck className="h-3.5 w-3.5" />
            <span className="motion-preset-expand bg-background motion-duration-[0.3s] absolute top-1/2 right-0 flex h-full -translate-y-1/2 transform items-center rounded-e-sm px-8 text-teal-400">
              Copied!
            </span>
          </>
        ) : (
          <>
            <Terminal
              className={cn(
                "h-3.5 w-3.5",
                "transition-all duration-200",
                "group-hover:rotate-12"
              )}
            />
          </>
        )}
        <span className="font-mono">npx shadcn add {name}</span>
      </Button>
    );
  };

  return (
    <div className="not-prose relative z-0 flex items-center justify-between pb-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative mr-auto w-full"
      >
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
          >
            Code
          </TabsTrigger>

          <div className="grow"></div>

          <div className="align-center mb-2 hidden flex-row gap-2 lg:flex">
            {renderTerminalButton()}
            <Button size="sm" asChild variant="default">
              <a
                href={`${prePath}/preview/${name}`}
                target="_blank"
                rel="noreferrer"
                className={cn("group no-underline transition-all duration-200")}
              >
                Live Preview
                <ArrowUpRight
                  className={cn(
                    "h-4 w-4",
                    "transition-transform duration-200 group-hover:rotate-45"
                  )}
                />
              </a>
            </Button>
          </div>

          <div className="mb-2 block lg:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-80 flex-col gap-2">
                <Button
                  size="sm"
                  onClick={handleTerminalClick}
                  variant="outline"
                  className="relative"
                >
                  {isTerminalCopied ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5" />
                      <span className="motion-preset-expand bg-background motion-duration-[0.3s] absolute top-1/2 right-0 flex h-full -translate-y-1/2 transform items-center rounded-e-sm px-8 text-teal-400">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Terminal
                        className={cn(
                          "h-3.5 w-3.5",
                          "transition-all duration-200",
                          "group-hover:rotate-12"
                        )}
                      />
                    </>
                  )}
                  <span className="font-mono">Install with CLI</span>
                </Button>

                <Button size="sm" asChild variant="default">
                  <a
                    href={`${prePath}/preview/${name}`}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "group no-underline transition-all duration-200"
                    )}
                  >
                    Live Preview
                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4",
                        "transition-transform duration-200 group-hover:rotate-45"
                      )}
                    />
                  </a>
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </TabsList>
        <TabsContent value="preview">
          <div className="preview flex min-h-[450px] w-full justify-center p-4">
            <ComponentLoader
              name={name}
              hasReTrigger={hasReTrigger}
              classNameComponentContainer={classNameComponentContainer}
            />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex w-full flex-col gap-4">
            <PageCodePreview
              selectedFile={selectedFile || ""}
              setSelectedFile={setSelectedFile}
              source={source}
              name={name}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
