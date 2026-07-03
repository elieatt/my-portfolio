import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import Pagination from "@/components/blog/Pagination";

const ADMIN_POSTS_PER_PAGE = 15;

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const parsed = Number.parseInt(pageParam ?? "1", 10);
  const requested = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;

  const supabase = await createSupabaseServerClient();

  const queryPage = (p: number) => {
    const from = (p - 1) * ADMIN_POSTS_PER_PAGE;
    return supabase
      .from("posts")
      .select("id, title, slug, date, published", { count: "exact" })
      .order("date", { ascending: false })
      .range(from, from + ADMIN_POSTS_PER_PAGE - 1);
  };

  const first = await queryPage(requested);
  const total = first.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / ADMIN_POSTS_PER_PAGE));

  // Out-of-range page — clamp to the last page and refetch.
  const page = Math.min(requested, totalPages);
  const result = page === requested ? first : await queryPage(page);
  const rows = result.data ?? [];

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

      {rows.length === 0 ? (
        <p className="text-gray-500 text-sm">No posts yet.</p>
      ) : (
        <>
          <div className="space-y-1">
            {rows.map((post) => (
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
          <Pagination
            basePath="/admin/posts"
            page={page}
            totalPages={totalPages}
            variant="admin"
          />
        </>
      )}
    </div>
  );
}
