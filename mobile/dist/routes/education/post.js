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
exports._getUserEducations = exports._filter = void 0;
const educations_1 = require("../../models/educations");
const mongodb_1 = require("mongodb");
const _filter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dummy_user = req.body;
    let data = yield (0, educations_1.filterEducations)(dummy_user);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._filter = _filter;
const _getUserEducations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, educations_1.getUserEducations)(new mongodb_1.ObjectId(req.body.user_id));
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getUserEducations = _getUserEducations;
//# sourceMappingURL=post.js.map