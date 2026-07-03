"use client";

import { useEffect, useState } from "react";
import { getAllPosts, type PostMeta } from "@/lib/blog";

// Fetches published posts client-side for the inner-world artifact ring.
// Never throws into the caller — on error the ring just shows no post tablets.
export function useInnerPosts() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAllPosts()
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch(() => {
        // Silently skip — the inner world just shows no post tablets.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading };
}
