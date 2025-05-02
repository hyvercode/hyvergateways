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
import { toDataURL } from "qrcode";
import { HTTPException } from "hono/http-exception";
export const createSessionController = () => {
    const app = new Hono();
    app.get("/", createKeyMiddleware(), (c) => __awaiter(void 0, void 0, void 0, function* () {
        return c.json({
            data: whatsapp.getAllSession(),
        });
    }));
    const startSessionSchema = z.object({
        session: z.string(),
    });
    app.post("/start", createKeyMiddleware(), requestValidator("json", startSessionSchema), (c) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = c.req.valid("json");
        const isExist = whatsapp.getSession(payload.session);
        if (isExist) {
            throw new HTTPException(400, {
                message: "Session already exist",
            });
        }
        const qr = yield new Promise((r) => __awaiter(void 0, void 0, void 0, function* () {
            yield whatsapp.startSession(payload.session, {
                onConnected() {
                    r(null);
                },
                onQRUpdated(qr) {
                    r(qr);
                },
            });
        }));
        if (qr) {
            return c.json({
                qr: qr,
            });
        }
        return c.json({
            data: {
                message: "Connected",
            },
        });
    }));
    app.get("/start", createKeyMiddleware(), requestValidator("query", startSessionSchema), (c) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = c.req.valid("query");
        const isExist = whatsapp.getSession(payload.session);
        if (isExist) {
            throw new HTTPException(400, {
                message: "Session already exist",
            });
        }
        const qr = yield new Promise((r) => __awaiter(void 0, void 0, void 0, function* () {
            yield whatsapp.startSession(payload.session, {
                onConnected() {
                    r(null);
                },
                onQRUpdated(qr) {
                    r(qr);
                },
            });
        }));
        if (qr) {
            return c.render(`
            <div id="qrcode"></div>

            <script type="text/javascript">
                let qr = '${yield toDataURL(qr)}'
                let image = new Image()
                image.src = qr
                document.body.appendChild(image)
            </script>
            `);
        }
        return c.json({
            data: {
                message: "Connected",
            },
        });
    }));
    app.all("/logout", createKeyMiddleware(), (c) => __awaiter(void 0, void 0, void 0, function* () {
        yield whatsapp.deleteSession(c.req.query().session || (yield c.req.json()).session || "");
        return c.json({
            data: "success",
        });
    }));
    return app;
};
