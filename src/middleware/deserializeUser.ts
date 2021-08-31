import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { decode } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const accessToken = get(request, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(request, "headers.x-refresh");

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken, "accessTokenSecret");

  if (decoded) {
    // @ts-ignore TODO
    request.user = decoded;

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      response.setHeader("x-access-token", newAccessToken);
      // TODO
      const { decoded } = decode(newAccessToken, "accessTokenSecret");

      // @ts-ignore
      request.user = decoded;
    }
  }

  return next();
};

export default deserializeUser;
