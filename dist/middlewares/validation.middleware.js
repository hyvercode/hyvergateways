var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
export const requestValidator = (target, schema, hook) => 
//   @ts-expect-error not typed well
validator(target, (value, c) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield schema.safeParseAsync(value);
    if (hook) {
        const hookResult = yield hook(Object.assign({ data: value }, result), c);
        if (hookResult) {
            if (hookResult instanceof Response) {
                return hookResult;
            }
            if ("response" in hookResult) {
                return hookResult.response;
            }
        }
    }
    if (!result.success) {
        throw new HTTPException(400, {
            message: `${(_a = result.error.errors[0]) === null || _a === void 0 ? void 0 : _a.message} field '${(_b = result.error.errors[0]) === null || _b === void 0 ? void 0 : _b.path}' on ${target}`,
        });
    }
    return result.data;
}));
