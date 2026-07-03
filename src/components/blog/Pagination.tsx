import Link from "next/link";
import { BLOG_TEXT } from "@/data/content";

interface Props {
  basePath: string;
  page: number;
  totalPages: number;
  variant?: "terminal" | "admin";
}

export default function Pagination({
  basePath,
  page,
  totalPages,
  variant = "terminal",
}: Props) {
  if (totalPages <= 1) return null;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const href = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`);

  if (variant === "admin") {
    const base = "text-xs px-3 py-1.5 rounded transition-colors";
    const active = "bg-gray-900 text-gray-300 hover:bg-gray-800";
    const off = "text-gray-700 pointer-events-none";
    return (
      <div className="flex items-center justify-between pt-2">
        {hasPrev ? (
          <Link href={href(page - 1)} className={`${base} ${active}`}>
            Previous
          </Link>
        ) : (
          <span className={`${base} ${off}`}>Previous</span>
        )}
        <span className="text-gray-600 text-xs">
          Page {page} / {totalPages}
        </span>
        {hasNext ? (
          <Link href={href(page + 1)} className={`${base} ${active}`}>
            Next
          </Link>
        ) : (
          <span className={`${base} ${off}`}>Next</span>
        )}
      </div>
    );
  }

  const base = "font-mono text-xs tracking-widest transition-colors";
  const active = "text-green-600 hover:text-green-400";
  const off = "text-green-950 pointer-events-none";
  return (
    <div className="flex items-center justify-between pt-6">
      {hasPrev ? (
        <Link href={href(page - 1)} className={`${base} ${active}`}>
          {BLOG_TEXT.pagination.prev}
        </Link>
      ) : (
        <span className={`${base} ${off}`}>{BLOG_TEXT.pagination.prev}</span>
      )}
      <span className="font-mono text-green-800 text-xs tracking-widest">
        {BLOG_TEXT.pagination.pageLabel(page, totalPages)}
      </span>
      {hasNext ? (
        <Link href={href(page + 1)} className={`${base} ${active}`}>
          {BLOG_TEXT.pagination.next}
        </Link>
      ) : (
        <span className={`${base} ${off}`}>{BLOG_TEXT.pagination.next}</span>
      )}
    </div>
  );
}
