import { Request, Response } from "express";
import { omit } from "lodash";
import {
  createUser,
  findUser,
  validatePassword,
} from "../service/user.service";
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
      return response
        .status(409)
        .send({ error: request.t("errors.409UserExist") });
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
  try {
    return response.status(200).send(omit(request.user, ["iat", "exp"]));
  } catch (e) {
    return serverErrorHandler(e, "getUserInfoHandler", response, request);
  }
};

export const changeUserInfoHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { _id } = request.user;
    const newData = request.body;

    const isExist = await User.findOne({ name: newData.name }).lean();

    if (isExist)
      return response
        .status(409)
        .send({ error: request.t("errors.409NameExist") });

    await User.updateOne({ _id }, { ...newData });

    return response.status(200).send({ ...newData });
  } catch (e) {
    return serverErrorHandler(e, "changeUserInfoHandler", response, request);
  }
};

export const changeUserPasswordHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { email } = request.user;
    const { oldPassword, password } = request.body;

    const isValid = await validatePassword(email, oldPassword);

    if (!isValid)
      return response
        .status(404)
        .send({ error: request.t("errors.404incorrectPassword") });

    await User.updateOne({ email }, { password });

    return response.sendStatus(200);
  } catch (e) {
    return serverErrorHandler(
      e,
      "changeUserPasswordHandler",
      response,
      request
    );
  }
};
