import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }], // MCQ options
  answer: { type: String }, // correct answer
  explanation: { type: String }, // optional explanation
});

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // raw notes
    summary: { type: String }, // AI summary
    quiz: [quizQuestionSchema], // AI generated quiz
    topicTags: [{ type: String }],
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
