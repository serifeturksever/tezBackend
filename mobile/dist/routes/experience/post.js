"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getCompanyUsers = exports._getUserExperiences = exports._filter = void 0;
const experiences_1 = require("../../models/experiences");
const mongodb_1 = require("mongodb");
// What types of POST should be included ?
const _filter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let dummy_user = req.body;
    let data = yield (0, experiences_1.filterExperiences)(dummy_user);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._filter = _filter;
const _getUserExperiences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, experiences_1.getUserExperiences)(new mongodb_1.ObjectId(req.body.user_id));
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getUserExperiences = _getUserExperiences;
const _getCompanyUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, experiences_1.getCompanyUsers)(new mongodb_1.ObjectId(req.body.company_id));
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getCompanyUsers = _getCompanyUsers;
//# sourceMappingURL=post.js.map