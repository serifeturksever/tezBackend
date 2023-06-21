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
exports.getMemberWithId = exports.getMemberIdWithEmail = exports.updateMemberBookmark = exports.connectAccountWithLinkedIn = exports.addUserIdToMember = exports.getCompanyWithId = exports.isUsernameExist = exports.informFollowerMembersAboutMemberUpdateByEmail = exports.getFollowerEmaiById = exports.getMembers = void 0;
const app_1 = require("../app");
const users_1 = require("./users");
const favourites_1 = require("./favourites");
const microServices_1 = require("../services/microServices");
const collectionRead = app_1.mongodbRead.collection('members');
const collectionWrite = app_1.mongodbWrite.collection('members');
const getMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find().toArray();
});
exports.getMembers = getMembers;
const getFollowerEmaiById = (fav_id) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "_id": fav_id }, { "projection": { "email": 1 } });
});
exports.getFollowerEmaiById = getFollowerEmaiById;
const informFollowerMembersAboutMemberUpdateByEmail = (fav_id, memberName, newExperience) => __awaiter(void 0, void 0, void 0, function* () {
    let willInformMemberEmails = [];
    let willInformUserIds = yield (0, favourites_1.getFollowerMembers)(fav_id, "member");
    console.log(fav_id);
    console.log(willInformUserIds);
    for (let i = 0; i < willInformUserIds.length; i++) {
        let memberMail = yield (0, exports.getFollowerEmaiById)(willInformUserIds[i]);
        if (memberMail) {
            willInformMemberEmails.push(memberMail.email);
        }
    }
    let data = yield (0, microServices_1.ServicesRequest)(null, // -> Express.request
    null, // -> Express.response
    "MAILER", // -> İsteğin atıldığı servis MAILER: mail servisi
    "mail/informFollowerMembers", // -> isteğin atıldığı path
    "POST", // HTTP request tipi
    {
        "emails": willInformMemberEmails,
        "memberName": memberName,
        "newExperience": newExperience
    }, {
        "requestFromInside": "ms",
        "ms": "MOBILE" // isteği atan servis
    });
});
exports.informFollowerMembersAboutMemberUpdateByEmail = informFollowerMembersAboutMemberUpdateByEmail;
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
const getMemberWithId = (member_id) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "_id": member_id });
});
exports.getMemberWithId = getMemberWithId;
//# sourceMappingURL=members.js.map