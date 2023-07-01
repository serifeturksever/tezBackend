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
exports._getUsersWithUserIds = exports._getFilteredUsers = exports._getCompanyUsersAsUserObj = exports._filter = void 0;
const users_1 = require("../../models/users");
const mongodb_1 = require("mongodb");
const _filter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dummy_user = req.body;
    let data = yield (0, users_1.filterUsers)(dummy_user);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._filter = _filter;
const _getCompanyUsersAsUserObj = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, users_1.getCompanyUsersAsUserObj)(new mongodb_1.ObjectId(req.body.company_id));
    console.log("data: ", data);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getCompanyUsersAsUserObj = _getCompanyUsersAsUserObj;
const _getFilteredUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, users_1.getFilteredUsers)(req.body);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getFilteredUsers = _getFilteredUsers;
const _getUsersWithUserIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _userIdArr = req.body.userIdArr;
    const data = yield (0, users_1.getUsersWithUserIds)(_userIdArr);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getUsersWithUserIds = _getUsersWithUserIds;
//# sourceMappingURL=post.js.map