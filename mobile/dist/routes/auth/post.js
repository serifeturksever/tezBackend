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
exports._updatePassword = exports._forgotPassword = exports._login = exports._signup = void 0;
const guard_1 = require("../../services/guard");
const auth_1 = require("../../models/auth");
const members_1 = require("../../models/members");
const microServices_1 = require("../../services/microServices");
var randomNumber = require("random-number-csprng");
const _signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const crypt = new guard_1.Crypt();
    let [fullname, username, email, password, repassword] = [
        req.body.fullname,
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.repassword,
    ];
    const _isUsernameExist = yield (0, members_1.isUsernameExist)(username);
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
    if (register.status == "ok") {
        let data = yield (0, microServices_1.ServicesRequest)(null, // -> Express.request
        null, // -> Express.response
        "MAILER", // -> İsteğin atıldığı servis MAILER: mail servisi
        "mail/register", // -> isteğin atıldığı path
        "POST", // HTTP request tipi
        {
            "email": req.body.email,
            "username": req.body.username // POST HTTP request parametreleri
        }, {
            "requestFromInside": "ms",
            "ms": "MOBILE" // isteği atan servis
        });
        res.send({
            status: "ok",
            msg: "success",
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
    if (data) {
        const crypt = new guard_1.Crypt();
        const comparePassword = yield crypt.compareHashes(password, data.password);
        if (comparePassword) {
            try {
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
// https://stackoverflow.com/questions/71270087/res-status-send-not-working-correctly-in-promise-all
//# sourceMappingURL=post.js.map