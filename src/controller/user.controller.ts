import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../logger";
import User, { IUserDocument } from "../model/user.model";
import { createTokensAndSession } from "../service/session.service";

export const createUserHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const isUserExist = await User.findOne({ email: request.body.email });
    if (isUserExist) {
      return response
        .status(409)
        .send({ error: "User with this email is already exist" });
    }

    const user = (await createUser(request.body)) as IUserDocument;

    const { accessToken, refreshToken } = await createTokensAndSession(
      request,
      omit(user, "password")
    );

    return response.status(201).send({ accessToken, refreshToken });
  } catch (error) {
    log.error("createUserHandler");
    log.error(error);
    return response.status(409).send(error.message);
  }
};

export const getUserInfoHandler = async (
  request: Request,
  response: Response
) => {
  return response.status(200).send(request.user);
};
