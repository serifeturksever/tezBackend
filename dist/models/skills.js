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
exports.getSkills = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('skills');
const collectionWrite = app_1.mongodbWrite.collection('skills');
// export const getSkills = async (): Promise<any> => {
//     return collectionRead.find({}).toArray()
// }
const getSkills = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, title, user_id,
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
exports.getSkills = getSkills;
//# sourceMappingURL=skills.js.map