import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { BLOG_TEXT } from "@/data/content";

interface Props {
  post: PostMeta;
}

export default function PostCard({ post }: Props) {
  return (
    <div className="space-y-2 py-6 border-b border-green-950 last:border-0">
      <p className="text-gray-600 text-xs tracking-widest">{post.date}</p>
      <h2 className="text-white text-lg font-bold tracking-wide">{post.title}</h2>
      <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-green-800 border border-green-950 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="inline-block font-mono text-xs text-green-600 hover:text-green-400 tracking-widest transition-colors pt-1"
      >
        {BLOG_TEXT.card.readLink}
      </Link>
    </div>
  );
}
