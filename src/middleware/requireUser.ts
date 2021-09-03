import { NextFunction, Request, Response } from "express";
import { get } from "lodash";

const requireUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = get(request, "user");

  if (!user)
    return response
      .status(403)
      .send({ error: request.t("errors.403AccessDenied") });

  return next();
};

export default requireUser;
