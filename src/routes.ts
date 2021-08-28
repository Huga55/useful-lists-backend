import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSchema,
  createUsersSessionSchema,
} from "./schema/user.schema";
import validateRequest from "./middleware/validateRequest";
import {
  createUsersSessionHandler,
  getUsersSessionHandler,
  invalidateUsersSessionHandler,
} from "./controller/session.controller";
import requireUser from "./middleware/requireUser";

export default (app: Express) => {
  // register user
  app.post(
    "/api/user/register",
    validateRequest(createUserSchema),
    createUserHandler
  );
  // login user
  app.post(
    "/api/user/login",
    validateRequest(createUsersSessionSchema),
    createUsersSessionHandler
  );
  // logout
  app.delete("/api/logout", requireUser, invalidateUsersSessionHandler);
  // get user info
  app.get("/api/user");
  // get user's session
  app.get("/api/session", requireUser, getUsersSessionHandler);
};
