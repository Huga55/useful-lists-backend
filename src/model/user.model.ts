import { Document, model, Schema, HookNextFunction } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { get } from "lodash";

export interface IUserDocument extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  sectionsMax: number;
  notesMax: number;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    sectionsMax: {
      type: Number,
      default: config.get("sectionsMax"),
    },
    notesMax: {
      type: Number,
      default: config.get("notesMax"),
    },
  },
  { timestamps: true }
);

async function generatePassword(user: IUserDocument) {
  // Random additional data
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  return hash;
}

UserSchema.pre("updateOne", async function (next: HookNextFunction) {
  // @ts-ignore
  const data = this.getUpdate();

  if (!get(data, "password")) return next();

  const hash = await generatePassword(data);
  // Replace the password with the hash
  if (hash) data.password = hash;

  return next();
});

UserSchema.pre("save", async function (next: HookNextFunction) {
  const user = this as IUserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  const hash = await generatePassword(user);
  // Replace the password with the hash
  if (hash) user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as IUserDocument;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch {
    return false;
  }
};

const User = model("User", UserSchema);

export default User;
