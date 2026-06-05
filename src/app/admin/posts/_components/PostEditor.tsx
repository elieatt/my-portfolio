"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { Post } from "@/lib/blog";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function Cursor() {
  return <span className="inline-block w-2 h-3.5 bg-current cursor-blink ml-1 align-middle" />;
}

interface Props {
  post?: Post;
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function PostEditor({ post }: Props) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tags, setTags] = useState(post?.tags?.join(", ") ?? "");
  const [date, setDate] = useState(post?.date ?? new Date().toISOString().slice(0, 10));
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
      if (!slugTouched) setSlug(toSlug(value));
    },
    [slugTouched]
  );

  const handleSave = async () => {
    if (!title || !slug || !content) {
      setError("Title, slug, and content are required.");
      return;
    }
    setSaving(true);
    setError("");

    const supabase = getSupabaseBrowserClient();
    const payload = {
      title,
      slug,
      excerpt,
      content,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      date,
      published,
    };

    const { error: dbError } = isEditing
      ? await supabase.from("posts").update(payload).eq("id", post.id)
      : await supabase.from("posts").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(true);

    const supabase = getSupabaseBrowserClient();
    await supabase.from("posts").delete().eq("id", post!.id);

    router.push("/admin/posts");
    router.refresh();
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-lg font-semibold">
          {isEditing ? "Edit post" : "New post"}
        </h1>
        <div className="flex items-center gap-3">
          {isEditing && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`text-xs transition-all ${
                deleting
                  ? "text-green-600 font-mono tracking-widest"
                  : "text-red-500 hover:text-red-400"
              }`}
            >
              {deleting ? <span className="flex items-center gap-1">&gt; REMOVING<Cursor /></span> : "Delete"}
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`text-xs font-medium rounded px-3 py-1.5 transition-all ${
              saving
                ? "bg-transparent text-green-500 border border-green-900 font-mono tracking-widest"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {saving ? <span className="flex items-center gap-1">&gt; WRITING<Cursor /></span> : "Save"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <div className={`space-y-4 transition-opacity duration-200 ${saving || deleting ? "opacity-40 pointer-events-none" : ""}`}>
        {/* Title */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs uppercase tracking-widest">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
            className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-gray-600"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs uppercase tracking-widest">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            placeholder="post-slug"
            className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-gray-600 font-mono"
          />
        </div>

        {/* Excerpt */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs uppercase tracking-widest">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="One-sentence summary shown on the listing page"
            rows={2}
            className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-gray-600 resize-none"
          />
        </div>

        {/* Tags + Date row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-gray-400 text-xs uppercase tracking-widest">
              Tags <span className="normal-case text-gray-600">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="nestjs, api, go"
              className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-gray-600"
            />
          </div>
          <div className="space-y-1">
            <label className="text-gray-400 text-xs uppercase tracking-widest">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-gray-600"
            />
          </div>
        </div>

        {/* Published toggle */}
        <label className="flex items-center gap-3 cursor-pointer w-fit">
          <div
            onClick={() => setPublished((p) => !p)}
            className={`w-9 h-5 rounded-full transition-colors ${
              published ? "bg-green-600" : "bg-gray-700"
            } relative`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                published ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </div>
          <span className="text-gray-400 text-xs uppercase tracking-widest">
            {published ? "Published" : "Draft"}
          </span>
        </label>

        {/* Content */}
        <div className="space-y-1">
          <label className="text-gray-400 text-xs uppercase tracking-widest">Content</label>
          <div data-color-mode="dark">
            <MDEditor
              value={content}
              onChange={(val) => setContent(val ?? "")}
              height={500}
              preview="edit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
