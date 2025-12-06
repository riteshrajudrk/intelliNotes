import dotenv from "dotenv";
import OpenAI from "openai";
import Note from "../models/Note.js";
dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper to call OpenAI Chat API
const getChatCompletion = async (messages) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // or gpt-4.1-mini etc if available in your account
    messages,
    temperature: 0.4,
  });

  return completion.choices[0].message.content?.trim();
};

// @desc    Generate AI summary for a note
// @route   POST /api/ai/summarize
export const summarizeNote = async (req, res, next) => {
  try {
    const { noteId, content } = req.body;

    let textToSummarize = content;

    if (!textToSummarize && noteId) {
      const note = await Note.findById(noteId);
      if (!note) {
        res.status(404);
        return next(new Error("Note not found"));
      }
      textToSummarize = note.content;
    }

    if (!textToSummarize) {
      return res
        .status(400)
        .json({ message: "Provide noteId or raw content to summarize" });
    }

    const prompt = `
You are an AI assistant helping a college student revise from their notes.

Summarize the following content into:
- 4–8 bullet points
- Focus on exam-important concepts
- Highlight formulas / definitions clearly

Content:
${textToSummarize}
`;

    const summary = await getChatCompletion([
      {
        role: "system",
        content:
          "You create concise, student-friendly summaries for exam revision.",
      },
      {
        role: "user",
        content: prompt,
      },
    ]);

    let updatedNote = null;

    if (noteId) {
      updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { summary },
        { new: true }
      );
    }

    res.json({
      summary,
      note: updatedNote,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Generate quiz questions based on notes
// @route   POST /api/ai/generate-quiz
export const generateQuiz = async (req, res, next) => {
  try {
    const { noteId, content, numQuestions = 5 } = req.body;

    let baseText = content;

    if (!baseText && noteId) {
      const note = await Note.findById(noteId);
      if (!note) {
        res.status(404);
        return next(new Error("Note not found"));
      }
      baseText = note.content;
    }

    if (!baseText) {
      return res
        .status(400)
        .json({ message: "Provide noteId or raw content to generate quiz" });
    }

    const prompt = `
You are a quiz generator for college students.

Generate ${numQuestions} MCQ questions from the following content.

Return STRICT JSON in this format ONLY (no extra text):

{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "answer": "exact option text",
      "explanation": "short explanation"
    }
  ]
}

Content:
${baseText}
`;

    const raw = await getChatCompletion([
      {
        role: "system",
        content:
          "You generate clean JSON with MCQ questions for students to practice.",
      },
      {
        role: "user",
        content: prompt,
      },
    ]);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("JSON parse error from AI:", e.message);
      console.error("Raw AI output:", raw);
      return res.status(500).json({
        message: "Failed to parse quiz JSON from AI",
      });
    }

    const quizQuestions = parsed.questions || [];

    let updatedNote = null;

    if (noteId) {
      updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { quiz: quizQuestions },
        { new: true }
      );
    }

    res.json({
      quiz: quizQuestions,
      note: updatedNote,
    });
  } catch (err) {
    next(err);
  }
};
