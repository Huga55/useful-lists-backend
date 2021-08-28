import config from "config";
import jwt from "jsonwebtoken";

export const decode = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.get("accessTokenSecret"));

    return { valid: true, expired: false, decoded };
  } catch (e) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
