"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.errorMessage = exports.successMessage = void 0;
exports.successMessage = { status: "success" };
exports.errorMessage = { status: "error" };
exports.status = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    created: 201,
    bad: 400,
    conflict: 409
};
