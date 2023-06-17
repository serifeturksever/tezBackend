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
    .post('/filter', post_1._filter)
    .post('/getUserCourses', post_1._getUserCourses);
//# sourceMappingURL=routes.js.map