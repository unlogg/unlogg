"use client";
import { buttonVariants } from "@unlogg/ui/components/button";
import { cn } from "@unlogg/ui/lib/utils";
import Link from "fumadocs-core/link";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { ChevronDown, Copy, CopyCheck, ExternalLink } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@unlogg/ui/components/dropdown-menu";
import { siteConfig } from "@/config/site";

const cache = new Map<string, string>();

// export const ActionButtons = ({ slug }: { slug: string[] }) => {
//   const [isLoading, setLoading] = useState(false);
//   const [checkedCopy, onClickCopy] = useCopyButton(async () => {
//     setLoading(true);
//     const url = `/llms.mdx/${slug.join("/")}`;
//     console.log("Copying LLM text from URL:", url);
//     try {
//       const cached = cache.get(url);

//       if (cached) {
//         await navigator.clipboard.writeText(cached);
//       } else {
//         await navigator.clipboard.write([
//           new ClipboardItem({
//             "text/plain": fetch(url).then(async (res) => {
//               const content = await res.text();
//               cache.set(url, content);

//               return content;
//             }),
//           }),
//         ]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   });

//   const [checkedOpen, onClickOpen] = useCopyButton(async () => {
//     setLoading(true);
//     const url = `/llms.mdx/${slug.join("/")}`;
//     // use nextjs navigation to open the URL in a new tab
//     window.open(url, "_blank");
//     setLoading(false);
//   });

//   return (
//     <DropdownButton
//       icon={<Copy className="size-4" />}
//       buttonText="Copy Page"
//       onButtonClick={(e) => onClickCopy(e)}
//       checked={checkedCopy}
//       options={[
//         {
//           icon: <Copy className="size-4" />,
//           label: "Copy Page",
//           description: "Copy page as Markdown for LLMs",
//           value: "copy",
//           onClick: (e) => onClickCopy(e),
//         },

//         {
//           icon: <ExternalLink className="size-4" />,
//           label: "View as Markdown",
//           description: "View this page in plain text",
//           value: "d",
//           onClick: (e) => onClickOpen(e),
//         },
//       ]}
//     />
//   );
// };

export function LLMCopyButton({ slug }: { slug: string[] }) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    setLoading(true);

    const url = `/llms.mdx/${slug.join("/")}`;
    console.log("Copying LLM text from URL:", url);
    try {
      const cached = cache.get(url);

      if (cached) {
        await navigator.clipboard.writeText(cached);
      } else {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": fetch(url).then(async (res) => {
              const content = await res.text();
              cache.set(url, content);

              return content;
            }),
          }),
        ]);
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={cn(
        buttonVariants({
          variant: "secondary",
          size: "sm",
          className: "gap-2",
        })
      )}
      onClick={onClick}
    >
      {checked ? (
        <CopyCheck className="size-3.5" />
      ) : (
        <Copy className="size-3.5" />
      )}
      Copy Markdown
    </button>
  );
}

export function LLMViewMarkdownButton({ slug }: { slug: string[] }) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    setLoading(true);
    const url = `/llms.mdx/${slug.join("/")}`;
    // use nextjs navigation to open the URL in a new tab
    window.open(url, "_blank");
    setLoading(false);
  });

  return (
    <button
      disabled={isLoading}
      className={cn(
        buttonVariants({
          variant: "secondary",
          size: "sm",
          className: "gap-2",
        })
      )}
      onClick={onClick}
    >
      <ExternalLink className="size-3.5" />
      View as Markdown
    </button>
  );
}

export function GitHubLink({ url }: { url: string }) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "secondary",
          size: "sm",
          className: "gap-2",
        })
      )}
      href={url}
    >
      <svg
        fill="currentColor"
        role="img"
        viewBox="0 0 24 24"
        className="size-3.5"
      >
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
      View on GitHub
    </Link>
  );
}

export function ViewOptions(props: {
  slug: string[];
  markdownUrl: string;
  githubUrl: string;
}) {
  const baseUrl = siteConfig.url;
  const mdPageUrl = `/llms.mdx/${props.slug.join("/")}`;
  const gpt = `https://chatgpt.com/?${new URLSearchParams({
    hints: "search",
    q: `Read ${baseUrl}${props.markdownUrl}, I want to ask questions about it.`,
  })}`;

  const [isLoading, setLoading] = useState(false);
  const [checkedCopy, onClickCopy] = useCopyButton(async () => {
    setLoading(true);

    console.log("Copying LLM text from URL:", mdPageUrl);
    try {
      const cached = cache.get(mdPageUrl);

      if (cached) {
        await navigator.clipboard.writeText(cached);
      } else {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": fetch(mdPageUrl).then(async (res) => {
              const content = await res.text();
              cache.set(mdPageUrl, content);

              return content;
            }),
          }),
        ]);
      }
    } finally {
      setLoading(false);
    }
  });

  const handleViewAsMarkdown = () => {
    const url = `/llms.mdx/${props.slug.join("/")}`;
    window.open(url, "_blank")?.focus();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "sm",
            className: "gap-2",
          })
        )}
      >
        Open
        <ChevronDown className="size-4 text-fd-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => window.open(props.githubUrl)?.focus()}
        >
          <svg fill="currentColor" role="img" viewBox="0 0 24 24">
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Open in GitHub
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => window.open(gpt, "_blank")?.focus()}>
          <ExternalLink />
          Ask ChatGPT
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => onClickCopy(e)}
          className="items-start [&>span]:pt-1.5"
        >
          <span>
            <Copy />
          </span>

          <div>
            <p>Copy Page</p>
            <p className="text-muted-foreground">
              Copy page as Markdown for LLMs
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleViewAsMarkdown()}
          className="items-start [&>span]:pt-1.5"
        >
          <span>
            <ExternalLink />
          </span>

          <div>
            <p>View as Markdown</p>
            <p className="text-muted-foreground">
              View this page in plain text
            </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
