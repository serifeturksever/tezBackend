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
exports.getUserById = exports.updatePassword = exports.getHashedPassword = exports.updatePasswordByUserId = exports.checkEmail = exports.createMember = exports.memberEmailExists = exports.forgotPassword = exports.signup = void 0;
const mongodb_1 = require("mongodb");
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('members');
const collectionWrite = app_1.mongodbWrite.collection('members');
const signup = (signupInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const emailRegex = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9_\-]@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]\.[a-zA-Z]+$', 'gm');
    if (emailRegex.test(signupInfo.email)) {
    }
    const emailExists = yield (0, exports.memberEmailExists)(signupInfo.email);
    console.log("emailex", emailExists);
    if (emailExists == null) {
        const memberData = {
            "name": signupInfo.name,
            "surname": signupInfo.surname,
            "username": signupInfo.username,
            "email": signupInfo.email,
            "password": signupInfo.hashedPassword,
            "createdAt": new Date().getTime(),
        };
        const member = yield (0, exports.createMember)(memberData);
        console.log("member", member);
        return {
            "status": "ok",
            "": "msg",
        };
    }
    else {
        return {
            "status": "error",
            "msg": "Email exists"
        };
    }
});
exports.signup = signup;
const forgotPassword = (email, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.checkEmail)(email);
    const result = {
        "status": "ok",
        "msg": ""
    };
    if (user) {
        (0, exports.updatePasswordByUserId)(user._id, hashedPassword).then();
        result.msg = `${user.surname.toUpperCase()} ${user.name}`;
    }
    else {
        result.status = 'error';
        result.msg = "Email doesn\'t exists";
    }
    return Promise.resolve(result);
});
exports.forgotPassword = forgotPassword;
const memberEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "email": email });
});
exports.memberEmailExists = memberEmailExists;
const createMember = (memberData) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.insertOne(memberData);
});
exports.createMember = createMember;
const checkEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield collectionRead.findOne({
        "email": email
    }, {
        "projection": {
            "_id": 1,
            "password": 1,
            "name": 1,
            "surname": 1,
            "username": 1,
        }
    });
    return Promise.resolve(user);
});
exports.checkEmail = checkEmail;
const updatePasswordByUserId = (userId, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.findOneAndUpdate({ "_id": userId }, {
        "$set": {
            "password": hashedPassword
        }
    });
});
exports.updatePasswordByUserId = updatePasswordByUserId;
const getHashedPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield collectionRead.findOne({
        "_id": new mongodb_1.ObjectId(userId),
        // "company_id": new ObjectId(companyId)
    }, {
        "projection": {
            "_id": 0,
            "password": 1
        }
    });
    const password = user ? user.password : "";
    return Promise.resolve(password);
});
exports.getHashedPassword = getHashedPassword;
const updatePassword = (userId, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {
        "status": "error",
        "msg": ""
    };
    const checkUser = yield (0, exports.getUserById)(new mongodb_1.ObjectId(userId));
    if (!checkUser) {
        result.status = "User does not exist";
    }
    else {
        collectionWrite.findOneAndUpdate({ "_id": new mongodb_1.ObjectId(userId) }, {
            "$set": {
                "password": hashedPassword,
                'updatedAt': new Date().getTime()
            }
        }).then();
        result.status = "ok";
    }
    return Promise.resolve(result);
});
exports.updatePassword = updatePassword;
const getUserById = (userId, companyId = null) => __awaiter(void 0, void 0, void 0, function* () {
    let a = yield collectionRead.findOne({ "_id": userId });
    return Promise.resolve(a);
});
exports.getUserById = getUserById;
//# sourceMappingURL=auth.js.map