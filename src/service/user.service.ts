import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { IUserDocument } from "../model/user.model";

export const createUser = async (input: DocumentDefinition<IUserDocument>) => {
  try {
    let newInput;
    if (input.name) {
      const isNameExist = await User.findOne({ name: input.name }).lean();
      if (isNameExist) {
        newInput = omit(input, "name");
      }
    }

    return (await User.create(newInput || input)).toObject();
  } catch (error) {
    throw new Error(error);
  }
};

export const findUser = async (query: FilterQuery<IUserDocument>) => {
  try {
    return await User.findOne(query).lean();
  } catch (e) {
    return false;
  }
};

export const validatePassword = async (
  email: IUserDocument["email"],
  password: IUserDocument["password"]
) => {
  const user = await User.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toObject(), "password");
};
