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
exports.getFilteredLanguages = exports.filterLanguages = exports.getUserLanguages = exports.getLanguages = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('m_languages');
const collectionWrite = app_1.mongodbWrite.collection('m_languages');
const getLanguages = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find().toArray();
});
exports.getLanguages = getLanguages;
const getUserLanguages = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "user_id": userId }).toArray();
});
exports.getUserLanguages = getUserLanguages;
const filterLanguages = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, title, user_id, level,
    //   image,
    //   about,
    //   connection_count,
    //   location
     } = params;
    // let { dataCount } = params;
    // let { startData } = params;
    // if (!dataCount) {
    //   dataCount = 1
    // }
    // else if (dataCount > 10000) {
    //   dataCount = 10000;
    // }
    let filter = {
        "_id": _id, //? bak buraya
    };
    if (title) {
        filter["title"] = { $regex: new RegExp(`${title}`, "i") };
    }
    // if (departmentName) {
    //   try {
    //     const checkDeparmentsName = await getDepartmentsByLikeName(company_id, departmentName);
    //     if (checkDeparmentsName.length > 0) {
    //       const deptIds = checkDeparmentsName.map(function (d: any) { return d._id; });
    //       filter["department_ids"] = { "$in": deptIds };
    //     } else {
    //       filter["department_ids"] = { "$in": [] };
    //     }
    //   }
    //   catch (e) {
    //     console.log("Department name error", e)
    //     filter["department_ids"] = { "$in": [] };
    //   }
    // }
    // if (crmId) {
    //   filter["crmId"] = { $regex: new RegExp(`${crmId}`, "i") };
    // }
    //
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
                            "level": 1,
                        }
                    },
                    // { $skip: startData ? startData : 0 },
                    // { $limit: dataCount }
                ],
                //   'count': [
                //     {
                //       '$match': filter
                //     }, {
                //       '$count': 'count'
                //     }
                //   ]
            }
        }
    ])
        .toArray();
    return Promise.resolve(value);
});
exports.filterLanguages = filterLanguages;
const getFilteredLanguages = (languages) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("merhaba ben language");
    let filter = {};
    let languagesObjArr = [];
    languages.split(",").map(skill => {
        let obj = {
            "title": skill
        };
        languagesObjArr.push(obj);
    });
    if (languagesObjArr.length > 1) {
        filter["$or"] = languagesObjArr;
    }
    else {
        filter = languagesObjArr[0];
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
exports.getFilteredLanguages = getFilteredLanguages;
//# sourceMappingURL=languages.js.map