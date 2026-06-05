export default function PostLoading() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 font-mono">
      <div className="w-24 h-3 bg-green-950 rounded animate-pulse" />

      <div className="space-y-3 pt-8 pb-6">
        <div className="w-20 h-3 bg-gray-900 rounded animate-pulse" />
        <div className="w-2/3 h-8 bg-gray-800 rounded animate-pulse" />
      </div>

      <hr className="border-green-950 mb-8" />

      <div className="text-green-800 text-sm space-y-1">
        <p>&gt; LOADING POST</p>
        <p className="flex items-center gap-1">
          <span>&gt;</span>
          <span className="inline-block w-2 h-4 bg-green-800 cursor-blink" />
        </p>
      </div>
    </main>
  );
}
