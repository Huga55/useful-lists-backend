import { IUserDocument } from "./src/model/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<IUserDocument, "password">;
    }
  }
}
