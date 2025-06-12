import type { Context, Next } from "hono";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";
import { DYNAMIC_ENV_ID } from "./constants";

const jwksUrl = `https://app.dynamic.xyz/api/v0/sdk/${DYNAMIC_ENV_ID}/.well-known/jwks`;

const jwksClient = new JwksClient({
  jwksUri: jwksUrl,
  rateLimit: true,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 600000
});

export const sessionInjector = async (c: Context, next: Next) => {
  const signingKey = await jwksClient.getSigningKey();
  const publicKey = signingKey.getPublicKey();

  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    c.set("user", null);
    return next();
  }

  const decodedToken: JwtPayload = jwt.verify(token, publicKey, {
    ignoreExpiration: false
  }) as JwtPayload;

  if (!decodedToken) {
    c.set("user", null);
    return next();
  }

  c.set("user", {
    username: decodedToken.username,
    email: decodedToken.email,
    id: decodedToken.sub
  });

  return next();
};
