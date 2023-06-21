"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const get_1 = require("./get");
const post_1 = require("./post");
exports.router = express_1.default.Router();
exports.router
    .get('/', get_1._get)
    .get('/getAllMails', get_1._getAllMails)
    .post('/register', post_1._sendRegisterMail)
    .post('/forgotPassword', post_1._sendForgotPasswordMail)
    .post('/updatePassword', post_1._sendUpdatePasswordMail)
    .post('/informFollowerMembers', post_1._informFollowerMembers);
//# sourceMappingURL=routes.js.map