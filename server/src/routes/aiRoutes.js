import express from "express";
import {
  summarizeNote,
  generateQuiz,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/summarize", summarizeNote);
router.post("/generate-quiz", generateQuiz);

export default router;
