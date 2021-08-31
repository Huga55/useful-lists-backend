import { LeanDocument } from "mongoose";
import { sign } from "jsonwebtoken";
import config from "config";
import { get } from "lodash";
import { Request } from "express";
import Session, { ISessionDocument } from "../model/session.model";
import { IUserDocument } from "../model/user.model";
import { decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export const createSession = async (userId: string, userAgent: string) => {
  const session = (
    await Session.create({ user: userId, userAgent })
  ).toObject();

  return session;
};

export const createAccessToken = (
  user:
    | Omit<IUserDocument, "password">
    | LeanDocument<Omit<IUserDocument, "password">>
) => {
  return sign(
    user,
    config.get("accessTokenSecret"),
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // Get the session
  const session = await Session.findById(get(decoded, "_id"));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  return createAccessToken(user);
};

export const createTokensAndSession = async (
  request: Request,
  user: Omit<IUserDocument, "password">
) => {
  // create session
  const session = await createSession(
    user._id,
    request.get("user-agent") || ""
  );

  // create access token
  const accessToken = createAccessToken(user);
  // create refresh token
  const refreshToken = sign(session, config.get("refreshTokenSecret"), {
    expiresIn: config.get("refreshTokenTtl"),
  });

  return { accessToken, refreshToken };
};
