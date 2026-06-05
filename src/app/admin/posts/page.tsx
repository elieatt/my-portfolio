import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminPostsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, date, published")
    .order("date", { ascending: false });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-lg font-semibold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-white text-black text-xs font-medium rounded px-3 py-1.5 hover:bg-gray-200 transition-colors"
        >
          + New post
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <p className="text-gray-500 text-sm">No posts yet.</p>
      ) : (
        <div className="space-y-1">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/posts/${post.id}`}
              className="flex items-center justify-between px-4 py-3 bg-gray-900 rounded hover:bg-gray-800 transition-colors group"
            >
              <div className="space-y-0.5 min-w-0">
                <p className="text-white text-sm truncate">{post.title}</p>
                <p className="text-gray-600 text-xs">{post.slug}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-gray-600 text-xs">{post.date}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    post.published
                      ? "bg-green-950 text-green-400"
                      : "bg-gray-800 text-gray-500"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
