import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import PostEditor from "../_components/PostEditor";
import type { Post } from "@/lib/blog";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  return <PostEditor post={data as Post} />;
}
