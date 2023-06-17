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
exports.memberFollowers = exports.getBookmarkedUsers = exports.getFollowerMembers = exports.getMemberFavAsUserIds = exports.isAnyMemberFavedUser = exports.getUserAsFav = exports.getUserFavs = void 0;
const app_1 = require("../app");
const users_1 = require("./users");
const members_1 = require("./members");
const collectionRead = app_1.mongodbRead.collection("m_favourites");
const collectionWrite = app_1.mongodbWrite.collection("m_favourites");
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
// export const updateBookmark = async (favourite: FAVOURITE ,actionType: String): Promise<any> => {
//   let isStillBookmarked;
//   if(actionType == "add"){ isStillBookmarked = true }else if(actionType == "delete"){ isStillBookmarked = false };
//       if(favourite.fav_type == "user"){
//         let user = await getUserWithId(favourite.fav_id);
//         user.isBookmarked = isStillBookmarked
//         await updateUserBookmark(user);
//     } else if(favourite.fav_type == "company") {
//         let company = await getCompanyWithId(favourite.fav_id);
//         company.isBookmarked = isStillBookmarked
//         await updateUserBookmark(company);
//     } else if(favourite.fav_type == "member"){
//         let member = await getMemberWithId(favourite.fav_id);
//         member.isBookmarked = isStillBookmarked
//         await updateUserBookmark(member);
//     }
// }
// export const updateFav = async (favourite: FAVOURITE): Promise<any> => {
//   let _checkFav = await checkFav(favourite);
//   console.log(_checkFav)
//   if (!_checkFav) {
//     await createFav(favourite);
//     await updateBookmark(favourite, "add");
//     return "data created"
//   } else {
//     await deleteFav(favourite);
//     let _stillFaved = await isAnyMemberFavedUser(favourite.fav_id);
//     console.log(_stillFaved)
//     if(!_stillFaved){
//       await updateBookmark(favourite,"delete");
//     }
//     return "data deleted"
//   }
// };
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
    console.log(fav_id, fav_type);
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
    let users = [];
    let data = (yield (0, exports.getMemberFavAsUserIds)(user_id, fav_type))[0];
    if (data) {
        for (let i = 0; i < data.favs.length; i++) {
            let user;
            if (fav_type == "member") {
                user = yield (0, members_1.getMemberWithId)(data.favs[i]);
            }
            else {
                user = yield (0, users_1.getUserWithId)(data.favs[i]);
            }
            users.push(user);
        }
    }
    return Promise.resolve(users);
});
exports.getBookmarkedUsers = getBookmarkedUsers;
const memberFollowers = (fav_id, fav_type) => __awaiter(void 0, void 0, void 0, function* () {
    let _followers = [];
    let data = (yield (0, exports.getFollowerMembers)(fav_id, fav_type))[0];
    console.log(data);
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