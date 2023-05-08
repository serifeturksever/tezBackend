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
exports.filterUsers = exports.getUsers = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('users');
const collectionWrite = app_1.mongodbWrite.collection('users');
// TODO: Pagination Yapısı için bir sistem düşünülecek -> startData, dataCount, limit tarzı
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find().toArray();
});
exports.getUsers = getUsers;
const filterUsers = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { full_name, about, location,
    // connection_count -> ekle
     } = params;
    // let { dataCount } = params;
    // let { startData } = params;
    // if (!dataCount) {
    //   dataCount = 1
    // }
    // else if (dataCount > 10000) {
    //   dataCount = 10000;
    // }
    let filter = {};
    if (full_name) {
        filter["full_name"] = { $regex: new RegExp(`${full_name}`, "i") };
    }
    if (about) {
        filter["about"] = { $regex: new RegExp(`${about}`, "i") };
    }
    if (location) {
        filter["location"] = { $regex: new RegExp(`${location}`, "i") };
    }
    console.log("filter", filter);
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
                            "full_name": 1,
                            "image": 1,
                            "about": 1,
                            "connection_count": 1,
                            "location": 1
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
    ]).toArray();
    // console.log("value",JSON.stringify(value))
    console.log("value", value[0].data);
    // eğer bu filtreye uygun kullanıcı yoksa array boş geliyor
    return Promise.resolve(value[0].data);
});
exports.filterUsers = filterUsers;
//# sourceMappingURL=users.js.map