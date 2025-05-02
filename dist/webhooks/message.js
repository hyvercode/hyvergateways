var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { webhookClient } from ".";
import { handleWebhookAudioMessage, handleWebhookDocumentMessage, handleWebhookImageMessage, handleWebhookVideoMessage, } from "./media";
export const createWebhookMessage = (props) => (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    if (message.key.fromMe || ((_a = message.key.remoteJid) === null || _a === void 0 ? void 0 : _a.includes("broadcast")))
        return;
    const endpoint = `${props.baseUrl}/message`;
    const image = yield handleWebhookImageMessage(message);
    const video = yield handleWebhookVideoMessage(message);
    const document = yield handleWebhookDocumentMessage(message);
    const audio = yield handleWebhookAudioMessage(message);
    const body = {
        session: message.sessionId,
        from: (_b = message.key.remoteJid) !== null && _b !== void 0 ? _b : null,
        message: ((_c = message.message) === null || _c === void 0 ? void 0 : _c.conversation) ||
            ((_e = (_d = message.message) === null || _d === void 0 ? void 0 : _d.extendedTextMessage) === null || _e === void 0 ? void 0 : _e.text) ||
            ((_g = (_f = message.message) === null || _f === void 0 ? void 0 : _f.imageMessage) === null || _g === void 0 ? void 0 : _g.caption) ||
            ((_j = (_h = message.message) === null || _h === void 0 ? void 0 : _h.videoMessage) === null || _j === void 0 ? void 0 : _j.caption) ||
            ((_l = (_k = message.message) === null || _k === void 0 ? void 0 : _k.documentMessage) === null || _l === void 0 ? void 0 : _l.caption) ||
            ((_o = (_m = message.message) === null || _m === void 0 ? void 0 : _m.contactMessage) === null || _o === void 0 ? void 0 : _o.displayName) ||
            ((_q = (_p = message.message) === null || _p === void 0 ? void 0 : _p.locationMessage) === null || _q === void 0 ? void 0 : _q.comment) ||
            ((_s = (_r = message.message) === null || _r === void 0 ? void 0 : _r.liveLocationMessage) === null || _s === void 0 ? void 0 : _s.caption) ||
            null,
        /**
         * media message
         */
        media: {
            image,
            video,
            document,
            audio,
        },
    };
    webhookClient.post(endpoint, body).catch(console.error);
});
