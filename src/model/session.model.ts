import { Schema, model } from "mongoose";
import { IUserDocument } from "./user.model";

export interface ISessionDocument {
  _id: string;
  user: IUserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
    },
  },
  { timestamps: true }
);

const Session = model<ISessionDocument>("Session", SessionSchema);

export default Session;
