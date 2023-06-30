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
exports._updateExperience = exports._deleteExperience = exports._getCompanyExperienceCount = exports._getCompanyUsers = exports._getUserExperiences = exports._createExperience = exports._filter = void 0;
const experiences_1 = require("../../models/experiences");
const mongodb_1 = require("mongodb");
const companies_1 = require("../../models/companies");
const members_1 = require("../../models/members");
const _filter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dummy_user = req.body;
    let data = yield (0, experiences_1.filterExperiences)(dummy_user);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._filter = _filter;
const _createExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let company_id = yield (0, companies_1.getCompanyIdWithName)(req.body.experienceCompany);
    if (!company_id) {
        let company = {
            name: req.body.experienceCompany,
            image: "",
            type: "Company",
            isBookmarked: false
        };
        let res = yield (0, companies_1.createCompany)(company);
        company_id = res.insertedId;
        console.log("inserted company id", company_id);
    }
    else {
        company_id = company_id["_id"];
    }
    let experience = {
        "user_id": new mongodb_1.ObjectId(req.body.memberUserId),
        "name": req.body.experienceName,
        "company_id": company_id,
        "establishment": req.body.experienceCompany,
        "range": req.body.experienceDate,
        "location": req.body.experienceLocation,
        "external": true
    };
    if (req.body.isExperienceConformable) {
        yield (0, members_1.informFollowerMembersAboutMemberExternalUpdateByEmail)(new mongodb_1.ObjectId(req.body.memberId), req.body.memberFullname, experience);
    }
    let data = yield (0, experiences_1.createExperience)(experience);
    if (data) {
        res.send({
            "status": "ok",
            "msg": "Experience Başarıyla eklendi"
        });
    }
    else {
        res.send({
            "status": "error",
            "msg": "Experience Eklenemedi"
        });
        console.log("data yok");
    }
});
exports._createExperience = _createExperience;
const _getUserExperiences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, experiences_1.getUserExperiences)(new mongodb_1.ObjectId(req.body.user_id));
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getUserExperiences = _getUserExperiences;
const _getCompanyUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, experiences_1.getCompanyUsers)(new mongodb_1.ObjectId(req.body.company_id));
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getCompanyUsers = _getCompanyUsers;
const _getCompanyExperienceCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, experiences_1.getCompanyExperienceCount)(new mongodb_1.ObjectId(req.body.companyId));
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getCompanyExperienceCount = _getCompanyExperienceCount;
const _deleteExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.experienceId);
    let experienceId = new mongodb_1.ObjectId(req.body.experienceId);
    let data = yield (0, experiences_1.deleteExperience)(experienceId);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._deleteExperience = _deleteExperience;
const _updateExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("update");
    let company_id = yield (0, companies_1.getCompanyIdWithName)(req.body.experienceCompany);
    if (!company_id) {
        let company = {
            name: req.body.experienceCompany,
            image: "",
            type: "Company",
            isBookmarked: false
        };
        let res = yield (0, companies_1.createCompany)(company);
        company_id = res.insertedId;
        console.log("inserted company id", company_id);
    }
    else {
        company_id = company_id["_id"];
    }
    let experience = {
        "_id": new mongodb_1.ObjectId(req.body.experienceId),
        "name": req.body.experienceName,
        "company_id": company_id,
        "establishment": req.body.experienceCompany,
        "range": req.body.experienceDate,
        "location": req.body.experienceLocation,
    };
    let data = yield (0, experiences_1.updateExperience)(experience);
    console.log("data", data);
    if (data) {
        if (data.modifiedCount == 0) {
            res.send({
                "status": "error",
                "msg": "Experience güncellenemedi"
            });
        }
        else {
            res.send({
                "status": "ok",
                "msg": "Experience Başarıyla güncellendi"
            });
        }
    }
    else {
        res.send({
            "status": "error",
            "msg": "Experience güncellenemedi"
        });
    }
});
exports._updateExperience = _updateExperience;
//# sourceMappingURL=post.js.map