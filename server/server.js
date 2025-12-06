import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import noteRoutes from "./src/routes/noteRoutes.js";
import aiRoutes from "./src/routes/aiRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

// MongoDB connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/intellinotes";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Intellinotes API running 🚀" });
});

app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
if(process.env.NODE_ENV !== "production"){
  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
}

export default app;
