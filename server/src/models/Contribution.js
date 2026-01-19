import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  status: { type: String, default: "pending" }
}, { timestamps: true });

export const Contribution = mongoose.model("Contribution", schema);
