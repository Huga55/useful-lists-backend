import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import User, { IUserDocument } from "../model/user.model";
import { createTokensAndSession } from "../service/session.service";
import { serverErrorHandler } from "../utils/errorsHandler.utils";

export const createUserHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const isUserExist = await User.findOne({ email: request.body.email });
    if (isUserExist) {
      return response.status(409).send({ error: request.t("409UserExist") });
    }

    const user = (await createUser(request.body)) as IUserDocument;

    const { accessToken, refreshToken } = await createTokensAndSession(
      request,
      omit(user, "password")
    );

    return response.status(201).send({ accessToken, refreshToken });
  } catch (e) {
    return serverErrorHandler(e, "createUserHandler", response, request);
  }
};

export const getUserInfoHandler = async (
  request: Request,
  response: Response
) => {
  return response.status(200).send(request.user);
};
