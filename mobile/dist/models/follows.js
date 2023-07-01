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
exports.getUserFollowers = exports.getUserFollowingsAsIdArray = exports.createFollow = exports.getUserFollowings = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection("m_followers");
const collectionWrite = app_1.mongodbWrite.collection("m_followers");
const getUserFollowings = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "member_id": memberId }).toArray();
});
exports.getUserFollowings = getUserFollowings;
const createFollow = (follow) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield collectionWrite.insertOne(follow);
    if (result.insertedId) {
        return Promise.resolve({
            "status": "ok",
            "msg": "Follow is created successfully"
        });
    }
    else {
        return Promise.resolve({
            "status": "error",
            "msg": "Follow could not be created"
        });
    }
});
exports.createFollow = createFollow;
const getUserFollowingsAsIdArray = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.aggregate([
        {
            '$match': {
                'member_id': memberId,
            }
        }, {
            '$group': {
                '_id': '$member_id',
                'followeds': {
                    '$push': '$followed_id'
                }
            }
        }
    ]).toArray();
});
exports.getUserFollowingsAsIdArray = getUserFollowingsAsIdArray;
const getUserFollowers = (followedId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.aggregate([
        {
            '$match': {
                'followed_id': followedId,
            }
        }, {
            '$group': {
                '_id': '$followed_id',
                'followers': {
                    '$push': '$member_id'
                }
            }
        }
    ]).toArray();
});
exports.getUserFollowers = getUserFollowers;
//# sourceMappingURL=follows.js.map