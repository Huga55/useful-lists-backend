import { Response, Request } from "express";
import log from "../logger";

export const serverErrorHandler = (
  error,
  errorPlace: string,
  response: Response,
  request: Request
) => {
  log.info(`error from ${errorPlace}`);
  log.error(error);
  return response
    .status(500)
    .send({ error: request.t("errors.500ServerError") });
};
