import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: String,
  score: Number,
  ending: String
}, { timestamps: true });

export const SimulationResult = mongoose.model("SimulationResult", schema);
