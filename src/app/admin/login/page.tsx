"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

function Cursor() {
  return <span className="inline-block w-2 h-3.5 bg-current cursor-blink ml-1 align-middle" />;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-white text-xl font-bold">Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage posts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-gray-400 text-xs uppercase tracking-widest">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-gray-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-400 text-xs uppercase tracking-widest">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-gray-600"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-sm font-medium rounded px-4 py-2 transition-all ${
              loading
                ? "bg-transparent text-green-500 border border-green-900 font-mono tracking-widest"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-1">
                &gt; CONNECTING<Cursor />
              </span>
            ) : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
