import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import QuizQuestionCard from "./QuizQuestionCard.jsx";

function ResultTabs({ activeTab, setActiveTab, summary, quiz }) {
  // For quiz answers per question
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswer = (questionKey, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionKey]: optionIndex,
    }));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-slate-800 px-4 pt-4">
        {[
          { id: "summary", label: "Summary" },
          { id: "quiz", label: "Quiz" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-3 py-2 text-xs font-medium ${
              activeTab === tab.id
                ? "text-indigo-100"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" />
            )}
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-[11px] text-slate-500 pt-2 pr-1">
          Results Panel
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "summary" ? (
          <div className="p-4 sm:p-5 h-full overflow-auto custom-scrollbar">
            {summary ? (
              <article className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc pl-5 space-y-1 text-slate-100/90"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="leading-snug" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="text-indigo-300" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-slate-100/90 mb-2" {...props} />
                    ),
                  }}
                >
                  {summary}
                </ReactMarkdown>
              </article>
            ) : (
              <EmptyState
                title="No summary yet"
                description="Click on 'Summarize Notes' after pasting your study material. Your AI summary will appear here with clean bullets and highlights."
              />
            )}
          </div>
        ) : (
          <div className="p-4 sm:p-5 h-full overflow-auto custom-scrollbar space-y-3">
            {quiz && quiz.length > 0 ? (
              quiz.map((q, index) => (
                <QuizQuestionCard
                  key={index}
                  index={index}
                  question={q}
                  selected={selectedAnswers[index]}
                  onSelect={(optIndex) => handleAnswer(index, optIndex)}
                />
              ))
            ) : (
              <EmptyState
                title="Quiz not generated"
                description="After summarizing or adding notes, click 'Generate Quiz' to get MCQs based on your content."
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center gap-2 text-slate-400">
      <div className="h-10 w-10 rounded-2xl bg-slate-800/80 flex items-center justify-center text-lg mb-1">
        📚
      </div>
      <h3 className="text-sm font-medium text-slate-100">{title}</h3>
      <p className="text-xs max-w-xs">{description}</p>
    </div>
  );
}

export default ResultTabs;
