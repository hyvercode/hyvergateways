var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseMediaPath = "./media/";
export const handleWebhookImageMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = message.message) === null || _a === void 0 ? void 0 : _a.imageMessage) {
        const baseMediaName = `${message.key.id}`;
        const fileName = `${baseMediaName}.jpg`;
        yield message.saveImage(baseMediaPath + fileName);
        return fileName;
    }
    return null;
});
export const handleWebhookVideoMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = message.message) === null || _a === void 0 ? void 0 : _a.videoMessage) {
        const baseMediaName = `${message.key.id}`;
        const fileName = `${baseMediaName}.mp4`;
        yield message.saveVideo(baseMediaPath + fileName);
        return fileName;
    }
    return null;
});
export const handleWebhookDocumentMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = message.message) === null || _a === void 0 ? void 0 : _a.documentMessage) {
        const baseMediaName = `${message.key.id}`;
        const fileName = `${baseMediaName}`;
        yield message.saveDocument(baseMediaPath + fileName);
        return fileName;
    }
    return null;
});
export const handleWebhookAudioMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = message.message) === null || _a === void 0 ? void 0 : _a.audioMessage) {
        const baseMediaName = `${message.key.id}`;
        const fileName = `${baseMediaName}.mp3`;
        yield message.saveAudio(baseMediaPath + fileName);
        return fileName;
    }
    return null;
});
