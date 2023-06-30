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
exports.notifyFollowerMembersAboutUpdates = exports.getUserNotifications = void 0;
const mongodb_1 = require("mongodb");
const app_1 = require("../app");
const follows_1 = require("./follows");
const members_1 = require("./members");
const microServices_1 = require("../services/microServices");
const users_1 = require("./users");
const companies_1 = require("./companies");
const collectionRead = app_1.mongodbRead.collection("m_notifications");
const collectionWrite = app_1.mongodbWrite.collection("m_notifications");
const getUserNotifications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "user_id": userId }).toArray();
});
exports.getUserNotifications = getUserNotifications;
const notifyFollowerMembersAboutUpdates = (notificationObj) => __awaiter(void 0, void 0, void 0, function* () {
    let willInformMemberEmails = [];
    let willInformMemberIds = yield (0, follows_1.getUserFollowers)(notificationObj.user_id);
    console.log(willInformMemberIds);
    if (willInformMemberIds.length == 0) {
        return;
    }
    try {
        for (let i = 0; i < willInformMemberIds[0].followers.length; i++) {
            let memberMail = yield (0, members_1.getFollowerEmailById)(willInformMemberIds[0].followers[i]);
            if (memberMail) {
                willInformMemberEmails.push(memberMail.email);
            }
        }
        let userNameRequest = yield (0, users_1.getUserFullName)(notificationObj.user_id);
        console.log(userNameRequest);
        let userName = userNameRequest ? userNameRequest["full_name"] : "user";
        // add course objects course name
        notificationObj.courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
            let companyName = yield (0, companies_1.getCompanyNameWithId)(new mongodb_1.ObjectId(course.company_id));
            course["company_name"] = companyName;
            return course;
        }));
        console.log(userName);
        console.log("Haber verilecek kullanıcı id'leri", willInformMemberEmails);
        let data = yield (0, microServices_1.ServicesRequest)(null, // -> Express.request
        null, // -> Express.response
        "MAILER", // -> İsteğin atıldığı servis MAILER: mail servisi
        "mail/notifyUserFollowersAboutUpdates", // -> isteğin atıldığı path
        "POST", // HTTP request tipi
        {
            "emails": willInformMemberEmails,
            "userName": userName,
            "updatedExperiences": notificationObj.experiences,
            "updatedSkills": notificationObj.skills,
            "updatedCourses": notificationObj.courses,
            "updatedEducations": notificationObj.educations,
            "updatedLanguages": notificationObj.languages,
        }, {
            "requestFromInside": "ms",
            "ms": "MOBILE" // isteği atan servis
        });
        if (data) {
            return Promise.resolve(data);
        }
        else {
            return Promise.resolve({
                "status": "error",
                "msg": "Mails could not be sent"
            });
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.notifyFollowerMembersAboutUpdates = notifyFollowerMembersAboutUpdates;
//# sourceMappingURL=notifications.js.map