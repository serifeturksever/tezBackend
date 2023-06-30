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
exports.filterEducations = exports.getUserEducations = exports.getEducations = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('educations');
const collectionWrite = app_1.mongodbWrite.collection('educations');
const getEducations = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find().toArray();
});
exports.getEducations = getEducations;
const getUserEducations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "user_id": userId }).toArray();
});
exports.getUserEducations = getUserEducations;
const filterEducations = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, title, company_id, employment_id, location, min_date, max_date, } = params;
    let filter = {
        "company_id": company_id,
        "employment_id": employment_id,
    };
    if (title) {
        filter["title"] = { $regex: new RegExp(`${title}`, "i") };
    }
    if (location) {
        filter["location"] = { $regex: new RegExp(`${location}`, "i") };
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
                            "location": 1,
                            "user_id": 1,
                            "company_id": 1,
                            "employment_id": 1,
                            "start_date": 1,
                            "end_date": 1,
                        }
                    },
                ],
            }
        }
    ])
        .toArray();
    return Promise.resolve(value);
});
exports.filterEducations = filterEducations;
//# sourceMappingURL=educations.js.map