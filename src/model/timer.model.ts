import { Schema, Document, model } from "mongoose";

export interface ITimerDocument extends Document {
  _id: string;
  note: string;
  date: Date;
  time: string;
  type: "once" | "everyDay" | "everyWeek" | "everyMonth" | "everyYear";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TimerSchema = new Schema(
  {
    note: {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "once",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Timer = model<ITimerDocument>("Timer", TimerSchema);

export default Timer;
