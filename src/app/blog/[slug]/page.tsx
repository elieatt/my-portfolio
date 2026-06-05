import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import { BLOG_TEXT, UI_TEXT } from "@/data/content";
import type { Metadata } from "next";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return { title: BLOG_TEXT.post.titleTemplate(post.title), description: post.excerpt };
  } catch {
    return {};
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const html = await renderMarkdown(post!.content);

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="text-green-600 text-xs tracking-widest hover:text-green-400 transition-colors"
      >
        {UI_TEXT.nav.backToLog}
      </Link>

      <header className="space-y-2 pt-8 pb-6">
        <p className="text-green-800 text-xs tracking-widest">
          {BLOG_TEXT.post.datePrefix} {post!.date}
        </p>
        <h1 className="text-white text-3xl font-bold tracking-wide">{post!.title}</h1>
        {post!.tags && post!.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-1">
            {post!.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-green-800 border border-green-950 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <hr className="border-green-950 mb-8" />

      <article
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <hr className="border-green-950 mt-8 mb-6" />

      <footer className="text-xs tracking-widest pb-4">
        <Link href="/" className="text-green-800 hover:text-green-600 transition-colors">
          {UI_TEXT.nav.backToTransmissionShort}
        </Link>
      </footer>
    </main>
  );
}
