import { parse } from "cookie";
import { verify } from "jsonwebtoken";

// Get our environment variables
const { JWT_SECRET, COOKIE_NAME } = process.env;

export function parseUser(ctx) {
  if (!ctx.req.headers.cookie) {
    return null;
  }

  const token = parse(ctx.req.headers.cookie)[COOKIE_NAME];

  if (!token) {
    return null;
  }

  try {
    const { iat, exp, ...user } = verify(token, JWT_SECRET);
    return user;
  } catch (e) {
    return null;
  }
}
