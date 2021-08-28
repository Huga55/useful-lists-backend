import { LeanDocument } from "mongoose";
import { sign } from "jsonwebtoken";
import config from "config";
import { get } from "lodash";
import Session, { ISessionDocument } from "../model/session.model";
import { IUserDocument } from "../model/user.model";
import { decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export const createSession = async (userId: string, userAgent: string) => {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
};

export const createAccessToken = async (
  user:
    | Omit<IUserDocument, "password">
    | LeanDocument<Omit<IUserDocument, "password">>,
  session:
    | Omit<ISessionDocument, "password">
    | LeanDocument<Omit<ISessionDocument, "password">>
) => {
  const accessToken = sign(
    { ...user, session: session._id },
    config.get("accessTokenSecret"),
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
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

  const accessToken = createAccessToken(user, session);

  return accessToken;
};
