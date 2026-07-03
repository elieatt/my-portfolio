import { supabase } from "./supabase";

export interface PostMeta {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  date: string;
}

export interface Post extends PostMeta {
  content: string;
  published: boolean;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, tags, date")
    .eq("published", true)
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as PostMeta[];
}

export async function getPostsPage(
  page: number,
  pageSize: number
): Promise<{ posts: PostMeta[]; total: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, tags, date", { count: "exact" })
    .eq("published", true)
    .order("date", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { posts: (data ?? []) as PostMeta[], total: count ?? 0 };
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) throw new Error(error?.message ?? "Post not found");
  return data as Post;
}
