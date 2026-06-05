import Link from "next/link";
import SignOutButton from "./_components/SignOutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <Link href="/admin/posts" className="text-white font-semibold text-sm hover:text-gray-300 transition-colors">
          Admin
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/blog" target="_blank" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
            View blog ↗
          </Link>
          <SignOutButton />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
