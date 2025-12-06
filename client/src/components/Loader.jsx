import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="h-9 w-9 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
        <p className="text-xs text-slate-200">
          Intellinotes is thinking with AI…
        </p>
      </div>
    </div>
  );
}

export default Loader;
