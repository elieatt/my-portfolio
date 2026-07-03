import Link from "next/link";
import { getPostsPage } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import Pagination from "@/components/blog/Pagination";
import { BLOG_TEXT, UI_TEXT, POSTS_PER_PAGE } from "@/data/content";

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const parsed = Number.parseInt(pageParam ?? "1", 10);
  const requested = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;

  const first = await getPostsPage(requested, POSTS_PER_PAGE);
  const total = first.total;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  // Out-of-range page (e.g. ?page=999) — clamp to the last page and refetch.
  const page = Math.min(requested, totalPages);
  const posts =
    page === requested ? first.posts : (await getPostsPage(page, POSTS_PER_PAGE)).posts;

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <Link
        href="/"
        className="text-green-600 text-xs tracking-widest hover:text-green-400 transition-colors"
      >
        {UI_TEXT.nav.backToTransmission}
      </Link>

      <header className="space-y-1 pt-4">
        <h1 className="text-white text-3xl font-bold tracking-wide">{BLOG_TEXT.listing.heading}</h1>
        <p className="text-gray-600 text-xs tracking-widest">
          {BLOG_TEXT.listing.postCount(total)}
        </p>
      </header>

      <hr className="border-green-950" />

      {total === 0 ? (
        <p className="text-green-800 text-sm tracking-widest py-8">{BLOG_TEXT.listing.empty}</p>
      ) : (
        <div>
          <div>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination basePath="/blog" page={page} totalPages={totalPages} variant="terminal" />
        </div>
      )}

      <footer className="text-green-900 text-xs tracking-widest text-center pt-8 pb-4">
        {BLOG_TEXT.listing.footer}
      </footer>
    </main>
  );
}
