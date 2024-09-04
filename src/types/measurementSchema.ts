import { Schema, model } from "mongoose";

export const MeasureSchema = new Schema({
  measure_type: String,
  value: Number,
  customer_code: String,
  created_at: { type: Date, default: Date.now },
});

export const Measure = model("Measure", MeasureSchema);
