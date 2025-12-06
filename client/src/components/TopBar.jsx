import React from "react";

function TopBar() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-50 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/90 shadow-lg shadow-indigo-500/40 text-sm font-bold">
            in
          </span>
          Intellinotes
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl">
          Turn messy notes into clean summaries and smart quizzes.
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
        <span className="px-2 py-1 rounded-full border border-slate-700/80 bg-slate-900/80">
          AI Summarizer
        </span>
        <span className="px-2 py-1 rounded-full border border-slate-700/80 bg-slate-900/80">
          Quiz Generator
        </span>
      </div>
    </header>
  );
}

export default TopBar;
