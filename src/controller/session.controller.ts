import { Request, Response } from "express";
import { get } from "lodash";
import { validatePassword } from "../service/user.service";
import { createTokensAndSession } from "../service/session.service";
import { IUserDocument } from "../model/user.model";
import Session from "../model/session.model";
import { serverErrorHandler } from "../utils/errorsHandler.utils";

export const createUsersSessionHandler = async (
  request: Request,
  response: Response
  // TODO
) => {
  try {
    // validation the email and password
    const user = (await validatePassword(
      request.body.email,
      request.body.password
    )) as Omit<IUserDocument, "password"> | null;

    if (!user)
      return response
        .status(401)
        .send({ error: request.t("errors.401InvalidEmailOrPassword") });

    const { accessToken, refreshToken } = await createTokensAndSession(
      request,
      user
    );

    return response.status(200).send({ accessToken, refreshToken });
  } catch (e) {
    return serverErrorHandler(
      e,
      "createUsersSessionHandler",
      response,
      request
    );
  }
};

export const getUsersSessionHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = get(request, "user.id");

    const sessions = await Session.findOne({
      user: userId,
      valid: true,
    }).lean();

    return response.status(200).send(sessions);
  } catch (e) {
    return serverErrorHandler(e, "getUsersSessionHandler", response, request);
  }
};

export const invalidateUsersSessionHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const sessionId = get(request, "user.session");

    await Session.updateOne({ _id: sessionId }, { value: false });

    return response.sendStatus(200);
  } catch (e) {
    return serverErrorHandler(
      e,
      "invalidateUsersSessionHandler",
      response,
      request
    );
  }
};
