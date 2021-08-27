import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import validateRequest from "./middleware/validateRequest";

export default (app: Express) => {
  app.get("/test", (request: Request, response: Response) =>
    response.sendStatus(201)
  );

  // register user
  app.post(
    "/api/register",
    validateRequest(createUserSchema),
    createUserHandler
  );
};
