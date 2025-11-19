"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = exports.apiOk = void 0;
const apiOk = (data, message) => ({ ok: true, data, message });
exports.apiOk = apiOk;
const apiError = (code, details, message) => ({
    ok: false, error: { code, details }, message
});
exports.apiError = apiError;
