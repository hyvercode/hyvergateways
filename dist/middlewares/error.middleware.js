import { HTTPException } from "hono/http-exception";
import { ApplicationError } from "../errors";
import { env } from "../env";
export const globalErrorMiddleware = (err, c) => {
    var _a;
    if (err instanceof HTTPException && err.message) {
        return c.json({ message: err.message }, err.status);
    }
    if (ApplicationError.isApplicationError(err)) {
        return c.json(err.getResponseMessage(), ((_a = err.code) !== null && _a !== void 0 ? _a : 500));
    }
    console.error("APP ERROR:", err);
    const message = env.NODE_ENV === "PRODUCTION"
        ? "Something went wrong, please try again later!"
        : err.message;
    return c.json({ message }, 500);
};
