"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
//import { _get } from './get';
const post_1 = require("./post");
const get_1 = require("./get");
exports.router = express_1.default.Router();
exports.router
    .get('/getUserFavs', get_1._getUserFavs)
    .get('/getUserAsFav', get_1._getUserAsFav)
    .post('/update', post_1._updateFav);
//# sourceMappingURL=routes.js.map