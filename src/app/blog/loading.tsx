export default function BlogLoading() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 space-y-8 font-mono">
      <div className="w-36 h-3 bg-green-950 rounded animate-pulse" />

      <div className="space-y-2 pt-4">
        <div className="w-28 h-7 bg-gray-800 rounded animate-pulse" />
        <div className="w-14 h-3 bg-gray-900 rounded animate-pulse" />
      </div>

      <hr className="border-green-950" />

      <div className="text-green-800 text-sm space-y-1 py-4">
        <p>&gt; FETCHING POSTS</p>
        <p className="flex items-center gap-1">
          <span>&gt;</span>
          <span className="inline-block w-2 h-4 bg-green-800 cursor-blink" />
        </p>
      </div>
    </main>
  );
}
