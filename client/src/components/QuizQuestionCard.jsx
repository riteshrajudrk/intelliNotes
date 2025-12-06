import React from "react";

function QuizQuestionCard({ index, question, selected, onSelect }) {
  // Support both `answerIndex` (number) and `answer` (text from backend)
  const correctIndex =
    typeof question.answerIndex === "number"
      ? question.answerIndex
      : question.options.findIndex((opt) => opt === question.answer);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-3 sm:px-4 sm:py-3">
      <div className="flex items-start gap-2 mb-2">
        <div className="mt-0.5 text-[11px] text-slate-400">{index + 1}.</div>
        <p className="text-sm text-slate-100">{question.question}</p>
      </div>

      <div className="grid gap-1.5 mt-1">
        {question.options.map((opt, optIndex) => {
          const isSelected = selected === optIndex;
          const isCorrect = correctIndex === optIndex;
          const showCorrect = selected !== undefined;

          return (
            <button
              key={optIndex}
              type="button"
              onClick={() => onSelect(optIndex)}
              className={`w-full text-left text-[11px] sm:text-xs px-2.5 py-1.5 rounded-lg border transition
                ${
                  isSelected
                    ? "border-indigo-400 bg-indigo-500/20 text-indigo-50"
                    : "border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-600"
                }
                ${
                  showCorrect && isCorrect
                    ? "border-emerald-400/80 bg-emerald-500/10"
                    : ""
                }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== undefined && (
        <div className="mt-2 text-[11px] text-slate-400">
          {selected === correctIndex ? (
            <span className="text-emerald-400">✔ Correct!</span>
          ) : (
            <span className="text-rose-400">
              ✘ Incorrect. Correct answer is option {correctIndex + 1}.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizQuestionCard;
