import jwt from "jsonwebtoken";
import type { UserType } from "../modules/item/user/userRepository";

export const encodeJWT = async (payload: UserType) => {
  const { email } = payload;
  const obj = { email };

  return jwt.sign(obj, process.env.APP_SECRET as string, {
    expiresIn: "24h",
  });
};
