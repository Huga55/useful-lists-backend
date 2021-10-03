import { Schema, model, Document } from "mongoose";

export interface INoteDocument extends Document {
  _id: string;
  section: string;
  user: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = model<INoteDocument>("Note", NoteSchema);

export default Note;
