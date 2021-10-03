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
import {
  changeSectionHandler,
  createSectionHandler,
  deleteSectionHandler,
  getAllSectionsHandler,
} from "./controller/section.controller";
import {
  changeSectionSchema,
  createSectionSchema,
} from "./schema/section.schema";
import {
  changeNoteHandler,
  createNoteInfoHandler,
  deleteNoteHandler,
  getNoteInfoHandler,
} from "./controller/note.controller";
import { changeNoteSchema, createNoteSchema } from "./schema/note.shema";

export default (app: Express) => {
  // test
  app.get("/api/test", (req, res) => {
    return res.send(req.t("test"));
  });
  // AUTH
  app.post(
    "/api/auth/register",
    validateRequest(createUserSchema),
    createUserHandler
  );
  app.post(
    "/api/auth/login",
    validateRequest(createUserSessionSchema),
    createUsersSessionHandler
  );
  app.delete("/api/auth/logout", requireUser, invalidateUsersSessionHandler);
  app.get("/api/session", requireUser, getUsersSessionHandler);
  // USER
  app.get("/api/user/info", requireUser, getUserInfoHandler);
  app.put(
    "/api/user/info",
    [requireUser, ...validateRequest(changeUserInfoSchema)],
    changeUserInfoHandler
  );
  app.put(
    "/api/user/password",
    [requireUser, ...validateRequest(changeUserPasswordSchema)],
    changeUserPasswordHandler
  );
  // SECTIONS
  app.get("/api/section", requireUser, getAllSectionsHandler);
  app.post(
    "/api/section",
    [requireUser, ...validateRequest(createSectionSchema)],
    createSectionHandler
  );
  app.put(
    "/api/section",
    [requireUser, ...validateRequest(changeSectionSchema)],
    changeSectionHandler
  );
  app.delete("/api/section/:_id", requireUser, deleteSectionHandler);
  // NOTES
  app.get("/api/note/:_id", requireUser, getNoteInfoHandler);
  app.post(
    "/api/note",
    [requireUser, ...validateRequest(createNoteSchema)],
    createNoteInfoHandler
  );
  app.put(
    "/api/note",
    [requireUser, ...validateRequest(changeNoteSchema)],
    changeNoteHandler
  );
  app.delete("/api/note/:_id", requireUser, deleteNoteHandler);
};
