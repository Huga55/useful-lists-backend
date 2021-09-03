import { TFunction } from "i18next";
import { IUserDocument } from "./src/model/user.model";

declare global {
  namespace Express {
    interface Request {
      user: Omit<IUserDocument, "password">;
      t: TFunction;
    }
  }
}
