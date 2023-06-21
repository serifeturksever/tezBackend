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
exports.getFilteredSkills = exports.filterSkills = exports.getUserSkills = exports.getSkills = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('m_skills');
const collectionWrite = app_1.mongodbWrite.collection('m_skills');
const getSkills = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({}).toArray();
});
exports.getSkills = getSkills;
const getUserSkills = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "user_id": userId }).toArray();
});
exports.getUserSkills = getUserSkills;
const filterSkills = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, title, user_id, } = params;
    let filter = {
        "_id": _id,
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
                            "user_id": 1,
                        }
                    },
                ],
            }
        }
    ])
        .toArray();
    return Promise.resolve(value);
});
exports.filterSkills = filterSkills;
const getFilteredSkills = (skills) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    let skillsObjArr = [];
    skills.split(",").map(skill => {
        let obj = {
            "title": skill
        };
        skillsObjArr.push(obj);
    });
    if (skillsObjArr.length > 1) {
        filter["$or"] = skillsObjArr;
    }
    else {
        filter = skillsObjArr[0];
    }
    return collectionRead.aggregate([
        {
            '$match': filter
        }, {
            '$group': {
                '_id': '$user_id',
                'title': {
                    '$push': '$title'
                }
            }
        }
    ]).toArray();
});
exports.getFilteredSkills = getFilteredSkills;
//# sourceMappingURL=skills.js.map