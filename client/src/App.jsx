import React, { useState } from "react";
import NoteInput from "./components/NoteInput.jsx";
import ControlsPanel from "./components/ControlsPanel.jsx";
import ResultTabs from "./components/ResultTabs.jsx";
import TopBar from "./components/TopBar.jsx";
import Loader from "./components/Loader.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [activeTab, setActiveTab] = useState("summary"); // "summary" | "quiz"
  const [settings, setSettings] = useState({
    summaryLength: "medium", // "short" | "medium" | "long" (not used yet in backend, but ready)
    difficulty: "easy", // "easy" | "medium" | "hard" (same here)
    numQuestions: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // 🔹 CALL /api/ai/summarize
  const handleSummarize = async () => {
    if (!notes.trim()) {
      showToast("Please paste or type some notes first.", "error");
      return;
    }

    try {
      setIsLoading(true);
      setActiveTab("summary");

      const res = await fetch(`${API_BASE_URL}/api/ai/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: notes,
          // you can also send extra options if you later handle them on backend
          // summaryLength: settings.summaryLength,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to generate summary");
      }

      const data = await res.json();
      setSummary(data.summary || "");
      showToast("Summary generated successfully ✅", "success");
    } catch (error) {
      console.error("Summarize error:", error);
      showToast(error.message || "Failed to generate summary.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 CALL /api/ai/generate-quiz
  const handleGenerateQuiz = async () => {
    if (!notes.trim() && !summary.trim()) {
      showToast("Add notes or generate a summary first.", "error");
      return;
    }

    try {
      setIsLoading(true);
      setActiveTab("quiz");

      const res = await fetch(`${API_BASE_URL}/api/ai/generate-quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: notes || summary, // prefer notes, fallback to summary
          numQuestions: settings.numQuestions,
          // difficulty: settings.difficulty, // if you handle it later on backend
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to generate quiz");
      }

      const data = await res.json();
      // Your backend returns: { quiz: [...], note: updatedNote }
      setQuiz(data.quiz || []);
      showToast("Quiz generated successfully ✅", "success");
    } catch (error) {
      console.error("Quiz error:", error);
      showToast(error.message || "Failed to generate quiz.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-emerald-500/10" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_top,_#4f46e520,_transparent_60%),_radial-gradient(circle_at_bottom,_#22c55e25,_transparent_55%)]" />

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <TopBar />

        <main className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
          {/* LEFT: Note input + Controls */}
          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)]">
              <NoteInput value={notes} onChange={setNotes} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)]">
              <ControlsPanel
                settings={settings}
                setSettings={setSettings}
                onSummarize={handleSummarize}
                onGenerateQuiz={handleGenerateQuiz}
                disabled={isLoading}
              />
            </div>
          </section>

          {/* RIGHT: Results */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)] min-h-[320px]">
            <ResultTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              summary={summary}
              quiz={quiz}
            />
          </section>
        </main>

      {isLoading && <Loader />}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-lg text-sm border
          ${
            toast.type === "error"
              ? "bg-rose-900/80 border-rose-500/50 text-rose-50"
              : "bg-emerald-900/80 border-emerald-500/50 text-emerald-50"
          }`}
        >
          {toast.message}
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
