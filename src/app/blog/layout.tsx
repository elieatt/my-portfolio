import type { Metadata } from "next";
import { BLOG_TEXT } from "@/data/content";

export const metadata: Metadata = {
  title: BLOG_TEXT.layout.title,
  description: BLOG_TEXT.layout.description,
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-black text-gray-200 font-mono">{children}</div>;
}
