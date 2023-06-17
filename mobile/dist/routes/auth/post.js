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
exports._updateUsername = exports._updatePassword = exports._forgotPassword = exports._login = exports._signup = void 0;
// import { requestChecker } from '../../app';
const guard_1 = require("../../services/guard");
const auth_1 = require("../../models/auth");
const mongodb_1 = require("mongodb");
const members_1 = require("../../models/members");
const microServices_1 = require("../../services/microServices");
var randomNumber = require("random-number-csprng");
const _signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body", req.body);
    const crypt = new guard_1.Crypt();
    let [fullname, username, email, password, repassword] = [
        req.body.fullname,
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.repassword,
    ];
    const _isUsernameExist = yield (0, members_1.isUsernameExist)(username);
    console.log(_isUsernameExist);
    if (_isUsernameExist) {
        res.send({
            status: "error",
            msg: "This username exists. Please choose another username!"
        });
        return;
    }
    const hashedPassword = yield crypt.hash(password);
    if (repassword != password) {
        res.send({
            status: "error",
            msg: "Password check failed!",
        });
        return;
    }
    const register = yield (0, auth_1.signup)({
        fullname,
        username,
        hashedPassword,
        email,
    });
    console.log("register", register);
    if (register.status == "ok") {
        let data = yield (0, microServices_1.ServicesRequest)(null, null, "MAILER", "mail/register", "POST", {
            "email": req.body.email,
            "username": req.body.username
        }, {
            "requestFromInside": "ms",
            "ms": "MOBILE"
        });
        console.log("data", data);
        res.send({
            status: "ok",
            msg: "success",
            //"token": guardData.token
        });
    }
    else {
        res.send({
            status: "error",
            "msg": "fail"
        });
    }
});
exports._signup = _signup;
const _login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const data = yield (0, auth_1.checkEmail)(email);
    console.log(data);
    if (data) {
        const crypt = new guard_1.Crypt();
        const comparePassword = yield crypt.compareHashes(password, data.password);
        if (comparePassword) {
            try {
                // res.locals.guard = guardData;
                res.send({
                    status: "ok",
                    msg: "success",
                    _id: data._id,
                    fullname: data.fullname,
                    username: data.username,
                    userId: data.userId ? data.userId : ""
                });
            }
            catch (ex) {
                res.send({
                    status: "error",
                    msg: "Invalid login info",
                    _id: "",
                    fullname: "",
                    userName: "",
                    userId: ""
                });
            }
        }
        else {
            res.send({
                status: "error",
                msg: "Invalid login info 2",
            });
        }
    }
    else {
        res.send({
            status: "error",
            msg: "Invalid login info",
        });
    }
});
exports._login = _login;
// const Login = async (res: express.Response, data: Object): Promise<IGuard> => {
//   const payload = {
//     "userId": data["userId"],
//     "userLanguage": data["userLanguage"],
//     "userRole": data["userRole"],
//     "userName": data["userName"],
//     "companyId": data["companyId"],
//     // "companyName": data["_companyName"],
//     // "companyLogo": data["_companyLogo"]
//   };
//   res.locals.guard.payload = payload;
//   let guardData = res.locals.guard;
//   const values: [any, any] = await Promise.all([
//     requestChecker.saveTokenToMemoryWithPayload(guardData, res),
//     requestChecker.saveCompanyToMemory(new ObjectId(data["companyId"]))
//   ]);
//   return values[0];
// }
const _forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const crypt = new guard_1.Crypt();
    const randomPassword = (yield randomNumber(100000, 999999)).toString();
    const password = yield crypt.hash(randomPassword);
    const update = yield (0, auth_1.forgotPassword)(req.body.email, password);
    if (update.status == "ok") {
        let data = yield (0, microServices_1.ServicesRequest)(null, null, "MAILER", "mail/forgotPassword", "POST", {
            "email": req.body.email,
            "password": randomPassword
        }, {
            "requestFromInside": "ms",
            "ms": "MOBILE"
        });
    }
    res.send(update);
});
exports._forgotPassword = _forgotPassword;
const _updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const crypt = new guard_1.Crypt();
    let [userId, password, newPassword, newPasswordAgain] = [
        req.body.userId,
        req.body.password,
        req.body.newPassword,
        req.body.newPasswordAgain,
    ];
    if (newPassword != newPasswordAgain) {
        res.send({
            status: "error",
            msg: "New Password and Confirm New Password is not equal."
        });
    }
    else {
        const oldHashedPassword = yield (0, auth_1.getHashedPassword)(userId);
        const comparePassword = yield crypt.compareHashes(password, oldHashedPassword);
        if (!comparePassword) {
            res.send({
                status: "error",
                msg: "Invalid old password"
            });
        }
        else {
            const hashedPassword = yield crypt.hash(newPassword);
            const row = yield (0, auth_1.updatePassword)(userId, hashedPassword);
            if (row["status"] == "ok") {
                let data = yield (0, microServices_1.ServicesRequest)(null, null, "MAILER", "mail/updatePassword", "POST", {
                    "email": row.data.value.email
                }, {
                    "requestFromInside": "ms",
                    "ms": "MOBILE"
                });
                res.send({
                    status: "ok",
                    msg: "Password changed successfully!"
                });
            }
            else {
                res.send({
                    status: "error",
                    msg: "Password could not be changed",
                });
            }
        }
    }
});
exports._updatePassword = _updatePassword;
const _updateUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let [memberId, newMemberName] = [
        req.body.memberId,
        req.body.newMemberName
    ];
    let updateResponse = yield (0, members_1.updateMemberWithMemberId)(new mongodb_1.ObjectId(memberId), newMemberName);
    if (!updateResponse.modifiedCount) {
        res.send({
            status: "error",
            msg: "User name couldn't be changed!"
        });
    }
    else {
        res.send({
            status: "ok",
            msg: "Username is changed successfully"
        });
    }
});
exports._updateUsername = _updateUsername;
// https://stackoverflow.com/questions/71270087/res-status-send-not-working-correctly-in-promise-all
//# sourceMappingURL=post.js.map