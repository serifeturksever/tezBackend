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
exports.filterCompanies = exports.getUserCompanies = exports.updateCompanyBookmark = exports.getCompanyWithId = exports.createCompany = exports.getCompanyIdWithName = exports.getCompanies = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('m_companies');
const collectionWrite = app_1.mongodbWrite.collection('m_companies');
const getCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "type": "Company" }).toArray();
});
exports.getCompanies = getCompanies;
const getCompanyIdWithName = (companyName) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "name": companyName }, { "projection": { "_id": 1 } });
});
exports.getCompanyIdWithName = getCompanyIdWithName;
const createCompany = (company) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.insertOne(company);
});
exports.createCompany = createCompany;
const getCompanyWithId = (company_id) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "_id": company_id });
});
exports.getCompanyWithId = getCompanyWithId;
const updateCompanyBookmark = (company) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.updateOne({
        "_id": company._id
    }, {
        "$set": {
            "isBookmarked": company.isBookmarked
        }
    });
});
exports.updateCompanyBookmark = updateCompanyBookmark;
const getUserCompanies = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "user_id": userId }).toArray();
});
exports.getUserCompanies = getUserCompanies;
const filterCompanies = (name) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    if (name) {
        filter["name"] = { $regex: new RegExp(`${name}`, "i") };
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
                            "name": 1,
                        }
                    },
                ],
            }
        }
    ])
        .toArray();
    return Promise.resolve(value);
});
exports.filterCompanies = filterCompanies;
//# sourceMappingURL=companies.js.map