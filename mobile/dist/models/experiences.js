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
exports.getFilteredExperiences = exports.getCompanyUsers = exports.filterExperiences = exports.getUserExperiences = exports.createExperience = exports.getExperiences = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('m_experiences');
const collectionWrite = app_1.mongodbWrite.collection('m_experiences');
const getExperiences = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find().toArray();
});
exports.getExperiences = getExperiences;
const createExperience = (experience) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.insertOne(experience);
});
exports.createExperience = createExperience;
const getUserExperiences = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "user_id": userId }).toArray();
});
exports.getUserExperiences = getUserExperiences;
const filterExperiences = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location } = params;
    let filter = {};
    if (name) {
        filter["name"] = { $regex: new RegExp(`${name}`, "i") };
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
                            "_id": 1,
                            "name": "$_id",
                            "company_id": 1,
                            "establishment": 1,
                            "location": 1,
                            "date": 1
                        }
                    },
                ],
            }
        }
    ])
        .toArray();
    return Promise.resolve(value);
});
exports.filterExperiences = filterExperiences;
const getCompanyUsers = (company_id) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield collectionRead.aggregate([
        {
            '$match': {
                'company_id': company_id
            }
        }, {
            '$group': {
                '_id': '$company_id',
                'users': {
                    '$push': '$user_id'
                }
            }
        }, {
            '$project': {
                '_id': 0
            }
        }
    ]).toArray();
    let result = data[0] ? data[0]["users"] : [];
    return Promise.resolve(result);
});
exports.getCompanyUsers = getCompanyUsers;
const getFilteredExperiences = (experiences) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    let experiencesObjArr = [];
    experiences.split(",").map(skill => {
        let obj = {
            "name": skill
        };
        experiencesObjArr.push(obj);
    });
    if (experiencesObjArr.length > 1) {
        filter["$or"] = experiencesObjArr;
    }
    else {
        filter = experiencesObjArr[0];
    }
    return collectionRead.aggregate([
        {
            '$match': filter
        }, {
            '$group': {
                '_id': '$user_id',
                'name': {
                    '$push': '$name'
                }
            }
        }
    ]).toArray();
});
exports.getFilteredExperiences = getFilteredExperiences;
//# sourceMappingURL=experiences.js.map