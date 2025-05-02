var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Hono } from "hono";
import { createKeyMiddleware } from "../middlewares/key.middleware";
import { requestValidator } from "../middlewares/validation.middleware";
import { z } from "zod";
import * as whatsapp from "wa-multi-session";
import { HTTPException } from "hono/http-exception";
export const createMessageController = () => {
    const app = new Hono();
    const sendMessageSchema = z.object({
        session: z.string(),
        to: z.string(),
        text: z.string(),
        is_group: z.boolean().optional(),
    });
    app.post("/send-text", createKeyMiddleware(), requestValidator("json", sendMessageSchema), (c) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new HTTPException(400, {
                message: "Session does not exist",
            });
        }
        yield whatsapp.sendTyping({
            sessionId: payload.session,
            to: payload.to,
            duration: Math.min(5000, payload.text.length * 100),
            isGroup: payload.is_group,
        });
        const response = yield whatsapp.sendTextMessage({
            sessionId: payload.session,
            to: payload.to,
            text: payload.text,
            isGroup: payload.is_group,
        });
        return c.json({
            data: response,
        });
    }));
    /**
     * @deprecated
     * This endpoint is deprecated, use POST /send-text instead
     */
    app.get("/send-text", createKeyMiddleware(), requestValidator("query", sendMessageSchema), (c) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = c.req.valid("query");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new HTTPException(400, {
                message: "Session does not exist",
            });
        }
        const response = yield whatsapp.sendTextMessage({
            sessionId: payload.session,
            to: payload.to,
            text: payload.text,
        });
        return c.json({
            data: response,
        });
    }));
    app.post("/send-image", createKeyMiddleware(), requestValidator("json", sendMessageSchema.merge(z.object({
        image_url: z.string(),
    }))), (c) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new HTTPException(400, {
                message: "Session does not exist",
            });
        }
        yield whatsapp.sendTyping({
            sessionId: payload.session,
            to: payload.to,
            duration: Math.min(5000, payload.text.length * 100),
            isGroup: payload.is_group,
        });
        const response = yield whatsapp.sendImage({
            sessionId: payload.session,
            to: payload.to,
            text: payload.text,
            media: payload.image_url,
            isGroup: payload.is_group,
        });
        return c.json({
            data: response,
        });
    }));
    app.post("/send-document", createKeyMiddleware(), requestValidator("json", sendMessageSchema.merge(z.object({
        document_url: z.string(),
        document_name: z.string(),
    }))), (c) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new HTTPException(400, {
                message: "Session does not exist",
            });
        }
        yield whatsapp.sendTyping({
            sessionId: payload.session,
            to: payload.to,
            duration: Math.min(5000, payload.text.length * 100),
            isGroup: payload.is_group,
        });
        const response = yield whatsapp.sendDocument({
            sessionId: payload.session,
            to: payload.to,
            text: payload.text,
            media: payload.document_url,
            filename: payload.document_name,
            isGroup: payload.is_group,
        });
        return c.json({
            data: response,
        });
    }));
    app.post("/send-sticker", createKeyMiddleware(), requestValidator("json", sendMessageSchema.merge(z.object({
        image_url: z.string(),
    }))), (c) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (!isExist) {
            throw new HTTPException(400, {
                message: "Session does not exist",
            });
        }
        const response = yield whatsapp.sendSticker({
            sessionId: payload.session,
            to: payload.to,
            media: payload.image_url,
            isGroup: payload.is_group,
        });
        return c.json({
            data: response,
        });
    }));
    return app;
};
