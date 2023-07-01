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
exports.memberFollowers = exports.getBookmarkedUsers = exports.getFollowerMembers = exports.getMemberFavAsUserIds = exports.isAnyMemberFavedUser = exports.updateFav = exports.getUserAsFav = exports.getUserFavs = void 0;
const app_1 = require("../app");
const users_1 = require("./users");
const companies_1 = require("./companies");
const members_1 = require("./members");
const collectionRead = app_1.mongodbRead.collection("favourites");
const collectionWrite = app_1.mongodbWrite.collection("favourites");
const getUserFavs = (userId, fav_type) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "user_id": userId, "fav_type": fav_type }).toArray();
});
exports.getUserFavs = getUserFavs;
const getUserAsFav = (favId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "fav_id": favId }).toArray();
});
exports.getUserAsFav = getUserAsFav;
const createFav = (favourite) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.insertOne(favourite);
});
const deleteFav = (favourite) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.deleteOne({
        "user_id": favourite.user_id,
        "fav_id": favourite.fav_id,
        "fav_type": favourite.fav_type
    });
});
const updateFav = (favourite) => __awaiter(void 0, void 0, void 0, function* () {
    let _checkFav = yield checkFav(favourite);
    if (!_checkFav) {
        yield createFav(favourite);
        return "data created";
    }
    else {
        yield deleteFav(favourite);
        return "data deleted";
    }
});
exports.updateFav = updateFav;
const checkFav = (favourite) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({
        "user_id": favourite.user_id,
        "fav_id": favourite.fav_id,
        "fav_type": favourite.fav_type
    }, {
        "projection": {
            "_id": 1,
        },
    });
});
const isAnyMemberFavedUser = (fav_id) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({
        "fav_id": fav_id
    });
});
exports.isAnyMemberFavedUser = isAnyMemberFavedUser;
const getMemberFavAsUserIds = (user_id, fav_type) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.aggregate([
        {
            '$match': {
                'user_id': user_id,
                'fav_type': fav_type
            }
        }, {
            '$group': {
                '_id': '$user_id',
                'favs': {
                    '$push': '$fav_id'
                }
            }
        }
    ]).toArray();
});
exports.getMemberFavAsUserIds = getMemberFavAsUserIds;
const getFollowerMembers = (fav_id, fav_type) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.aggregate([
        {
            '$match': {
                'fav_id': fav_id,
                'fav_type': fav_type
            }
        }, {
            '$group': {
                '_id': '$fav_id',
                'followers': {
                    '$push': '$user_id'
                }
            }
        }
    ]).toArray();
});
exports.getFollowerMembers = getFollowerMembers;
const getBookmarkedUsers = (user_id, fav_type) => __awaiter(void 0, void 0, void 0, function* () {
    let idArray = [];
    let data = (yield (0, exports.getMemberFavAsUserIds)(user_id, fav_type))[0];
    if (data) {
        for (let i = 0; i < data.favs.length; i++) {
            let id;
            if (fav_type == "member") {
                id = yield (0, members_1.getMemberWithId)(data.favs[i]);
            }
            else if (fav_type == "company") {
                id = yield (0, companies_1.getCompanyWithId)(data.favs[i]);
            }
            else {
                id = yield (0, users_1.getUserWithId)(data.favs[i]);
            }
            idArray.push(id);
        }
    }
    return Promise.resolve(idArray);
});
exports.getBookmarkedUsers = getBookmarkedUsers;
const memberFollowers = (fav_id, fav_type) => __awaiter(void 0, void 0, void 0, function* () {
    let _followers = [];
    let data = (yield (0, exports.getFollowerMembers)(fav_id, fav_type))[0];
    if (data) {
        for (let i = 0; i < data.followers.length; i++) {
            let follower = yield (0, members_1.getMemberWithId)(data.followers[i]);
            _followers.push(follower);
        }
    }
    return Promise.resolve(_followers);
});
exports.memberFollowers = memberFollowers;
//# sourceMappingURL=favourites.js.map