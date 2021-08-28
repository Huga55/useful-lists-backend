import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import config from "config";
import { get } from "lodash";
import { validatePassword } from "../service/user.service";
import { createAccessToken, createSession } from "../service/session.service";
import { IUserDocument } from "../model/user.model";
import Session from "../model/session.model";

export const createUsersSessionHandler = async (
  request: Request,
  response: Response
) => {
  // validation the email and password
  const user = (await validatePassword(
    request.body.emial,
    request.body.password
  )) as Omit<IUserDocument, "password"> | null;

  if (!user) return response.status(401).send("Invalid username of password");

  // create session
  const session = await createSession(
    user._id,
    request.get("user-agent") || ""
  );

  // create access token
  const accessToken = createAccessToken(user, session);

  // create refresh token
  const refreshToken = sign(session, config.get("refreshTokenSecret"), {
    expiresIn: config.get("refreshTokenTtl"),
  });

  return response.send({ accessToken, refreshToken });
};

export const getUsersSessionHandler = async (
  request: Request,
  response: Response
) => {
  const userId = get(request, "user.id");

  const sessions = await Session.findOne({ user: userId, valid: true }).lean();

  return response.send(sessions);
};

export const invalidateUsersSessionHandler = async (
  request: Request,
  response: Response
) => {
  const sessionId = get(request, "user.session");

  await Session.updateOne({ _id: sessionId }, { value: false });

  return response.sendStatus(200);
};
