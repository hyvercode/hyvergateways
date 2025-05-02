import { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { ApplicationError } from "../errors";
import { env } from "../env";

export const globalErrorMiddleware: ErrorHandler = (err, c) => {
  if (err instanceof HTTPException && err.message) {
    return c.json({ message: err.message }, err.status as any);
  }

  if (ApplicationError.isApplicationError(err)) {
    return c.json(err.getResponseMessage(), (err.code ?? 500) as any);
  }

  console.error("APP ERROR:", err);

  const message =
    env.NODE_ENV === "PRODUCTION"
      ? "Something went wrong, please try again later!"
      : err.message;

  return c.json({ message }, 500);
};