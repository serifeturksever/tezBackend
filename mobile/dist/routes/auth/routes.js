"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const post_1 = require("./post");
exports.router = express_1.default.Router();
exports.router
    //.get('/', _get)
    .post('/signup', post_1._signup)
    .post('/login', post_1._login)
    .post('/forgotPassword', post_1._forgotPassword)
    .post('/updatePassword', post_1._updatePassword);
//# sourceMappingURL=routes.js.map