import { NextFunction, Request, Response } from "express";
import { get } from "lodash";

const requireUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = get(request, "user");

  if (!user) return response.sendStatus(403);

  return next();
};

export default requireUser;
