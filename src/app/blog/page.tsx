import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import { BLOG_TEXT, UI_TEXT } from "@/data/content";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

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
          {BLOG_TEXT.listing.postCount(posts.length)}
        </p>
      </header>

      <hr className="border-green-950" />

      {posts.length === 0 ? (
        <p className="text-green-800 text-sm tracking-widest py-8">{BLOG_TEXT.listing.empty}</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <footer className="text-green-900 text-xs tracking-widest text-center pt-8 pb-4">
        {BLOG_TEXT.listing.footer}
      </footer>
    </main>
  );
}
