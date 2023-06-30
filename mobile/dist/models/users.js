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
exports.getAbilityUserId = exports.getFilteredUsers = exports.getCompanyUsersAsUserObj = exports.getUsersWithUserIds = exports.getUserWithId = exports.filterUsers = exports.addMemberIdToUser = exports.getUserIdWithProfileLink = exports.getUserFullName = exports.getUsers = void 0;
const mongodb_1 = require("mongodb");
const app_1 = require("../app");
const experiences_1 = require("./experiences");
const skills_1 = require("./skills");
const languages_1 = require("./languages");
const collectionRead = app_1.mongodbRead.collection('users');
const collectionWrite = app_1.mongodbWrite.collection('users');
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find().toArray();
});
exports.getUsers = getUsers;
const getUserFullName = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "_id": userId }, { "projection": { "_id": 0, "full_name": 1 } });
});
exports.getUserFullName = getUserFullName;
const getUserIdWithProfileLink = (profileLink) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({
        "profileLink": profileLink
    }, {
        "projection": {
            "_id": 0,
            "userId": "$_id"
        }
    });
});
exports.getUserIdWithProfileLink = getUserIdWithProfileLink;
const addMemberIdToUser = (memberId, profileLink) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.updateOne({
        "profileLink": profileLink
    }, {
        "$set": {
            "memberId": memberId
        }
    });
});
exports.addMemberIdToUser = addMemberIdToUser;
const filterUsers = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { full_name, about, location, } = params;
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
                ],
            }
        }
    ]).toArray();
    return Promise.resolve(value[0].data);
});
exports.filterUsers = filterUsers;
const getUserWithId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "_id": user_id });
});
exports.getUserWithId = getUserWithId;
const getUsersWithUserIds = (userIdArr) => __awaiter(void 0, void 0, void 0, function* () {
    let users = [];
    for (let i = 0; i < userIdArr.length; i++) {
        let user = yield (0, exports.getUserWithId)(new mongodb_1.ObjectId(userIdArr[i]));
        users.push(user);
    }
    return users;
});
exports.getUsersWithUserIds = getUsersWithUserIds;
const getCompanyUsersAsUserObj = (company_id) => __awaiter(void 0, void 0, void 0, function* () {
    let users = [];
    let companyUsers = yield (0, experiences_1.getCompanyUsers)(company_id);
    for (let i = 0; i < companyUsers.length; i++) {
        let user = yield (0, exports.getUserWithId)(companyUsers[i]);
        if (!users.includes(user)) {
            users.push(user);
        }
    }
    return Promise.resolve(users);
});
exports.getCompanyUsersAsUserObj = getCompanyUsersAsUserObj;
const getFilteredUsers = (filterObj) => __awaiter(void 0, void 0, void 0, function* () {
    let queryCount = Object.values(filterObj).filter(key => key != "").length;
    const filteredSkills = filterObj["skills"] != "" ? yield (0, skills_1.getFilteredSkills)(filterObj["skills"]) : [];
    const filteredExperiences = filterObj["experiences"] != "" ? yield (0, experiences_1.getFilteredExperiences)(filterObj["experiences"]) : [];
    const filteredLanguages = filterObj["languages"] != "" ? yield (0, languages_1.getFilteredLanguages)(filterObj["languages"]) : [];
    const responses = yield Promise.all([
        (0, exports.getAbilityUserId)(filterObj, "skills", filteredSkills),
        (0, exports.getAbilityUserId)(filterObj, "experiences", filteredExperiences),
        (0, exports.getAbilityUserId)(filterObj, "languages", filteredLanguages)
    ]);
    let mainSkillsArr = responses[0];
    let mainExperiencesArr = responses[1];
    let mainLanguagesArr = responses[2];
    let mergedAbilitiesArr = [...mainSkillsArr, ...mainExperiencesArr, ...mainLanguagesArr];
    let uniqueUserIds = [...new Set(mergedAbilitiesArr)];
    const elementCounts = uniqueUserIds.map(value => [value, mergedAbilitiesArr.filter(str => str === value).length]);
    let resultObj = elementCounts.filter(element => element[1] == queryCount);
    let result = resultObj.map(key => key[0]);
    if (result.length == 0) {
        return [];
    }
    let users = [];
    for (let i = 0; i < result.length; i++) {
        let user = yield (0, exports.getUserWithId)(new mongodb_1.ObjectId(result[i]));
        users.push(user);
    }
    return Promise.resolve(users);
});
exports.getFilteredUsers = getFilteredUsers;
const getAbilityUserId = (abilityObject, abilityString, filteredArray) => __awaiter(void 0, void 0, void 0, function* () {
    let mongoEntity = abilityString == "experiences" ? "name" : "title";
    let mainAbilityArr = [];
    if (abilityObject[abilityString] != "" && filteredArray.length > 0) {
        filteredArray.map(ability => {
            if (ability[mongoEntity].length == abilityObject[abilityString].split(",").length) {
                mainAbilityArr.push(ability["_id"].toString());
            }
        });
    }
    return mainAbilityArr;
});
exports.getAbilityUserId = getAbilityUserId;
//# sourceMappingURL=users.js.map