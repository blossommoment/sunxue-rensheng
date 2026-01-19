import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  theoryScore: { type: Number, default: 0 },
  practiceScore: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 }
}, { timestamps: true });

export const User = mongoose.model("User", schema);
