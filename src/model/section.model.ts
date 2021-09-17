import { Schema, model } from "mongoose";

export interface ISectionDocument {
  _id: string;
  user: string;
  name: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Section = model<ISectionDocument>("Section", SectionSchema);

export default Section;
