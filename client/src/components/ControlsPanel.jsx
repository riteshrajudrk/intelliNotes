import React from "react";

function ControlsPanel({
  settings,
  setSettings,
  onSummarize,
  onGenerateQuiz,
  disabled,
}) {
  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-slate-100">
          AI Controls & Quiz Preferences
        </h2>
        <span className="text-[11px] text-slate-400">
          Fine-tune your output for exams, interviews & revisions.
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {/* Summary length */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-slate-300">
            Summary Length
          </label>
          <div className="flex gap-1.5 text-[11px]">
            {["short", "medium", "long"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChange("summaryLength", option)}
                className={`flex-1 rounded-lg px-2 py-1.5 border transition ${
                  settings.summaryLength === option
                    ? "bg-indigo-500/90 border-indigo-400 text-white shadow-md shadow-indigo-500/40"
                    : "bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-slate-300">
            Quiz Difficulty
          </label>
          <select
            className="w-full rounded-lg bg-slate-950/80 border border-slate-700 px-2 py-1.5 text-[11px] text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/60"
            value={settings.difficulty}
            onChange={(e) => handleChange("difficulty", e.target.value)}
          >
            <option value="easy">Easy (revision)</option>
            <option value="medium">Medium (test yourself)</option>
            <option value="hard">Hard (exam mode)</option>
          </select>
        </div>

        {/* Num questions */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-slate-300">
            No. of Quiz Questions
          </label>
          <input
            type="range"
            min={3}
            max={20}
            value={settings.numQuestions}
            onChange={(e) => handleChange("numQuestions", Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>3</span>
            <span>{settings.numQuestions}</span>
            <span>20</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="text-[11px] text-slate-400">
          <span className="block">
            1️⃣ Click <span className="text-slate-100 font-medium">Summarize</span>{" "}
            to clean your notes.
          </span>
          <span className="block">
            2️⃣ Click <span className="text-slate-100 font-medium">Generate Quiz</span>{" "}
            for personalized MCQs.
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSummarize}
            disabled={disabled}
            className="px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed text-xs font-medium text-white shadow-lg shadow-indigo-500/40 transition"
          >
            Summarize Notes
          </button>
          <button
            type="button"
            onClick={onGenerateQuiz}
            disabled={disabled}
            className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-xs font-medium text-slate-950 shadow-lg shadow-emerald-500/40 transition"
          >
            Generate Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default ControlsPanel;
