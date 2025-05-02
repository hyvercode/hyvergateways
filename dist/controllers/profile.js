var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as whatsapp from "wa-multi-session";
import { Hono } from "hono";
import { requestValidator } from "../middlewares/validation.middleware";
import { z } from "zod";
import { createKeyMiddleware } from "../middlewares/key.middleware";
import { HTTPException } from "hono/http-exception";
export const createProfileController = () => {
    const app = new Hono();
    const getProfileSchema = z.object({
        session: z.string(),
        target: z
            .string()
            .refine((v) => v.includes("@s.whatsapp.net") || v.includes("@g.us"), {
            message: "target must contain '@s.whatsapp.net' or '@g.us'",
        }),
    });
    app.post("/", createKeyMiddleware(), requestValidator("json", getProfileSchema), (c) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new HTTPException(400, {
                message: "Session does not exist",
            });
        }
        const isRegistered = yield whatsapp.isExist({
            sessionId: payload.session,
            to: payload.target,
            isGroup: payload.target.includes("@g.us"),
        });
        if (!isRegistered) {
            throw new HTTPException(400, {
                message: "Target is not registered",
            });
        }
        return c.json({
            data: yield whatsapp.getProfileInfo({
                sessionId: payload.session,
                target: payload.target,
            }),
        });
    }));
    return app;
};
