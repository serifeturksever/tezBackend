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
exports.getAbilityUserId = exports.getFilteredUsers = exports.getCompanyUsersAsUserObj = exports.getUsersWithUserIds = exports.getUserWithId = exports.filterUsers = exports.addMemberIdToUser = exports.getUserIdWithProfileLink = exports.getUsers = void 0;
const mongodb_1 = require("mongodb");
const app_1 = require("../app");
const experiences_1 = require("./experiences");
const skills_1 = require("./skills");
const languages_1 = require("./languages");
const collectionRead = app_1.mongodbRead.collection('m_users');
const collectionWrite = app_1.mongodbWrite.collection('m_users');
// TODO: Pagination Yapısı için bir sistem düşünülecek -> startData, dataCount, limit tarzı
// FIXME: userId parametre olarak objectId mi alsın ?
// Company içerisinde userId yok ?
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find().toArray();
});
exports.getUsers = getUsers;
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
        users.push(user);
    }
    return Promise.resolve(users);
});
exports.getCompanyUsersAsUserObj = getCompanyUsersAsUserObj;
const getFilteredUsers = (filterObj) => __awaiter(void 0, void 0, void 0, function* () {
    // bu kodun eski hali signalde 08 haziran 2023 11.15
    // burhandundar2399 mailinde
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
    console.log("users", users);
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