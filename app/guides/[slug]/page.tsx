import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideCtaBand } from "@/components/guides/guide-cta-band";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata(
  { params }: PageProps<"/guides/[slug]">
): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const publishedDate = new Date(guide.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Guide
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-xs text-muted-foreground">{publishedDate}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <div
          className="prose prose-neutral max-w-none prose-headings:font-heading prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: guide.html }}
        />
      </section>

      <GuideCtaBand />
    </>
  );
}
