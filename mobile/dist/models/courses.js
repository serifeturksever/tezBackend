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
exports.filterCourses = exports.getUserCourses = exports.getCourses = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('m_courses');
const collectionWrite = app_1.mongodbWrite.collection('m_courses');
const getCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find().toArray();
});
exports.getCourses = getCourses;
const getUserCourses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "user_id": userId }).toArray();
});
exports.getUserCourses = getUserCourses;
const filterCourses = (title, company_id) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {
        "company_id": company_id
    };
    if (title) {
        filter["title"] = { $regex: new RegExp(`${title}`, "i") };
    }
    let value = yield collectionRead.aggregate([
        {
            $facet: {
                "data": [
                    {
                        $match: filter
                    },
                    {
                        "$project": {
                            "_id": 0,
                            "id": "$_id",
                            "title": 1,
                        }
                    },
                ],
            }
        }
    ])
        .toArray();
    return Promise.resolve(value);
});
exports.filterCourses = filterCourses;
//# sourceMappingURL=courses.js.map