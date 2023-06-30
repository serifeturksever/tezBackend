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
    .post('/getUserExperiences', post_1._getUserExperiences)
    .post('/getCompanyUsers', post_1._getCompanyUsers)
    .post('/createExperience', post_1._createExperience)
    .post('/delete', post_1._deleteExperience)
    .post('/update', post_1._updateExperience)
    .post('/companyExperienceCount', post_1._getCompanyExperienceCount);
//# sourceMappingURL=routes.js.map