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
exports.getMemberWithId = exports.updateMemberWithMemberId = exports.getMemberIdWithEmail = exports.updateMemberBookmark = exports.connectAccountWithLinkedIn = exports.addUserIdToMember = exports.getCompanyWithId = exports.isUsernameExist = exports.getMembers = void 0;
const app_1 = require("../app");
const users_1 = require("./users");
const collectionRead = app_1.mongodbRead.collection('members');
const collectionWrite = app_1.mongodbWrite.collection('members');
const getMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find().toArray();
});
exports.getMembers = getMembers;
const isUsernameExist = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({
        "username": username
    }, {
        "projection": {
            "_id": 1
        }
    });
});
exports.isUsernameExist = isUsernameExist;
const getCompanyWithId = (company_id) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "_id": company_id });
});
exports.getCompanyWithId = getCompanyWithId;
const addUserIdToMember = (userId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.updateOne({
        "_id": memberId
    }, {
        "$set": {
            "userId": userId
        }
    });
});
exports.addUserIdToMember = addUserIdToMember;
const connectAccountWithLinkedIn = (memberId, profileLink) => __awaiter(void 0, void 0, void 0, function* () {
    let relatedUserId = yield (0, users_1.getUserIdWithProfileLink)(profileLink);
    console.log("relatedUserId ===> ", relatedUserId);
    if (relatedUserId) {
        // let _addMemberIdToUser = await addMemberIdToUser(memberId,profileLink);
        // let _addUserrIdToMember = await addUserIdToMember(relatedUserId,memberId);
        yield Promise.all([
            (0, users_1.addMemberIdToUser)(memberId, profileLink),
            (0, exports.addUserIdToMember)(relatedUserId["userId"], memberId)
        ]);
        return Promise.resolve({ "status": "ok", "msg": "success" });
    }
    else {
        return Promise.resolve({ "status": "error", "msg": "Problem occured" });
    }
});
exports.connectAccountWithLinkedIn = connectAccountWithLinkedIn;
const updateMemberBookmark = (member) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.updateOne({
        "_id": member._id
    }, {
        "$set": {
            "isBookmarked": member.isBookmarked
        }
    });
});
exports.updateMemberBookmark = updateMemberBookmark;
const getMemberIdWithEmail = (memberEmail) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({
        "email": memberEmail
    }, {
        "projection": {
            "memberId": "$_id"
        }
    });
});
exports.getMemberIdWithEmail = getMemberIdWithEmail;
const updateMemberWithMemberId = (member_id, newUserName) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.updateOne({ "_id": member_id }, { "$set": { "username": newUserName } });
});
exports.updateMemberWithMemberId = updateMemberWithMemberId;
const getMemberWithId = (member_id) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "_id": member_id });
});
exports.getMemberWithId = getMemberWithId;
// export const filterUsers = async (params: MEMBER): Promise<any> => {
//     const {
//       full_name,
//       about,
//       location,
//       // connection_count -> ekle
//     } = params;
//     // let { dataCount } = params;
//     // let { startData } = params;
//     // if (!dataCount) {
//     //   dataCount = 1
//     // }
//     // else if (dataCount > 10000) {
//     //   dataCount = 10000;
//     // }
//     let filter = {};
//     if (full_name) {
//       filter["full_name"] = { $regex: new RegExp(`${full_name}`, "i") };
//     }
//     if (about) {
//       filter["about"] = { $regex: new RegExp(`${about}`, "i") };
//     }
//     if (location) {
//         filter["location"] = { $regex: new RegExp(`${location}`, "i") };
//       }
//    console.log("filter",filter)
//     let value = await collectionRead.aggregate([
//       {
//         $facet: {
//           "data": [
//             {
//               $match: filter
//             },
//             {
//               "$project": {
//                 "_id": 0,
//                 "id": "$_id",
//                 "full_name": 1,
//                 "image": 1,
//                 "about": 1,
//                 "connection_count": 1,
//                 "location": 1
//               }
//             },
//             // { $skip: startData ? startData : 0 },
//             // { $limit: dataCount }
//           ],
//         //   'count': [
//         //     {
//         //       '$match': filter
//         //     }, {
//         //       '$count': 'count'
//         //     }
//         //   ]
//         }
//       }
//     ]).toArray()
//    // console.log("value",JSON.stringify(value))
//    console.log("value", value[0].data)
//    // eğer bu filtreye uygun kullanıcı yoksa array boş geliyor
//     return Promise.resolve(value[0].data);
//   }
// export const getUserWithId = async (user_id: ObjectId): Promise<any> => {
//   return collectionRead.find({"_id": user_id}).toArray()
// }
// export const getCompanyUsersAsUserObj = async (company_id: ObjectId): Promise<any> => {
//   let users = []
//   let companyUsers = await getCompanyUsers(company_id);
//   for(let i=0;i<companyUsers.length;i++) {
//     let user = await getUserWithId(companyUsers[i]);
//     if(user[0]){
//       users.push(user[0])
//     }
//   }
//   return Promise.resolve(users);
// }
//# sourceMappingURL=members.js.map