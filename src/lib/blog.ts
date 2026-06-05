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
