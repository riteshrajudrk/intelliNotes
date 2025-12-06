import React from "react";

function NoteInput({ value, onChange }) {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-medium text-slate-100">
            Your Notes / Study Material
          </h2>
          <p className="text-xs text-slate-400">
            Paste lecture notes, PDFs text, book content, etc.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onChange("")}
          className="text-[11px] px-2 py-1 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
        >
          Clear
        </button>
      </div>

      <div className="relative">
        <textarea
  className="custom-scrollbar w-full min-h-[210px] max-h-[420px] rounded-xl bg-slate-950/70 border border-slate-800/80 px-3 py-3 text-sm text-slate-100 resize-y outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/60 placeholder:text-slate-500"
  placeholder="Example: Paste your class notes here..."
  value={value}
  onChange={(e) => onChange(e.target.value)}
/>

        <div className="pointer-events-none absolute right-3 bottom-2 text-[10px] text-slate-500">
          {value.length} chars
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <span>
          Tip: Try pasting notes for one full chapter for best quiz quality.
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 hover:bg-slate-700/90 transition"
        >
          <span className="text-[9px]">⬆</span>
          <span>Upload PDF (coming soon)</span>
        </button>
      </div>
    </div>
  );
}

export default NoteInput;
