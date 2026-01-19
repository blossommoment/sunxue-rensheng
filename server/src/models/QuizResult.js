import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: { type: Object, default: {} },
  score: { type: Number, default: 0 }
}, { timestamps: true });

export const QuizResult = mongoose.model("QuizResult", schema);
