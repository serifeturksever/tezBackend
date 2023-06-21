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
exports._getUserCourses = exports._filter = void 0;
const courses_1 = require("../../models/courses");
const mongodb_1 = require("mongodb");
const _filter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dummy_user = req.body;
    let data = yield (0, courses_1.filterCourses)(dummy_user);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._filter = _filter;
const _getUserCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, courses_1.getUserCourses)(new mongodb_1.ObjectId(req.body.user_id));
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getUserCourses = _getUserCourses;
//# sourceMappingURL=post.js.map