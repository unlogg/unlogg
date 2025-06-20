import { getMDXComponents } from "@/components/docs/mdx-components";
import { source } from "@/lib/source";
import { Separator } from "@unlogg/ui/components/separator";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { ViewOptions } from "./page.client";
export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{
        enabled: true,
        includeRoot: true,
        includePage: true,
        includeSeparator: true,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <div className="flex flex-col gap-2 items-start justify-start">
        <div className="flex gap-2 w-full items-start justify-between flex-wrap md:flex-nowrap">
          <div className="text-muted-foreground text-lg ">
            {" "}
            {page.data.description}
          </div>

          <div className="grow-0">
            {" "}
            {/* <ActionButtons slug={params.slug ?? []} /> */}
            <ViewOptions
              slug={params.slug ?? []}
              // markdownUrl={`${page.url}.mdx`}
              githubUrl={`https://github.com`}
            />
          </div>
        </div>

        <Separator />
      </div>
      <DocsBody>
        <MDXContent components={getMDXComponents(source, page)} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
