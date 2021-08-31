import { Response } from "express";
import log from "../logger";

export const serverErrorHandler = (
  error,
  errorPlace: string,
  response: Response
) => {
  log.info(`error from ${errorPlace}`);
  log.error(error);
  return response.status(500).send({ error: "Ой ой... Что-то пошло не так" });
};
