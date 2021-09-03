import { Express } from "express";
import {
  changeUserInfoHandler,
  changeUserPasswordHandler,
  createUserHandler,
  getUserInfoHandler,
} from "./controller/user.controller";
import {
  changeUserInfoSchema,
  changeUserPasswordSchema,
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import validateRequest from "./middleware/validateRequest";
import {
  createUsersSessionHandler,
  getUsersSessionHandler,
  invalidateUsersSessionHandler,
} from "./controller/session.controller";
import requireUser from "./middleware/requireUser";

export default (app: Express) => {
  // test
  app.get("/api/test", (req, res) => {
    return res.send(req.t("test"));
  });
  // register user
  app.post(
    "/api/auth/register",
    validateRequest(createUserSchema),
    createUserHandler
  );
  // login user
  app.post(
    "/api/auth/login",
    validateRequest(createUserSessionSchema),
    createUsersSessionHandler
  );
  // logout
  app.delete("/api/auth/logout", requireUser, invalidateUsersSessionHandler);
  // get user's session
  app.get("/api/session", requireUser, getUsersSessionHandler);
  // get user info
  app.get("/api/user/info", requireUser, getUserInfoHandler);
  // change user info
  app.put(
    "/api/user/info",
    [requireUser, ...validateRequest(changeUserInfoSchema)],
    changeUserInfoHandler
  );
  // change user password
  app.put(
    "/api/user/password",
    [requireUser, ...validateRequest(changeUserPasswordSchema)],
    changeUserPasswordHandler
  );
};
