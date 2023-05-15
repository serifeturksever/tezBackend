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
exports._forgotPassword = exports._login = exports._signup = void 0;
//import { requestChecker } from '../../app';
const guard_1 = require("../../services/guard");
const auth_1 = require("../../models/auth");
const mail_1 = require("../../services/mail");
var randomNumber = require("random-number-csprng");
const _signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body", req.body);
    const crypt = new guard_1.Crypt();
    let [name, surname, username, email, password, repassword] = [
        req.body.name,
        req.body.surname,
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.repassword,
    ];
    const hashedPassword = yield crypt.hash(password);
    if (repassword != password) {
        res.send({
            status: "error",
            msg: "Password check failed!",
        });
        return;
    }
    const register = yield (0, auth_1.signup)({
        name,
        surname,
        username,
        hashedPassword,
        email,
    });
    console.log("register", register);
    if (register.status == "ok") {
        res.send({
            status: "ok",
            msg: "",
            //"token": guardData.token
        });
    }
    else {
        res.send({
            status: "error",
            //"msg": saveCompany.msg
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
                // res.locals.guard = guardData;
                res.send({
                    status: "ok",
                    msg: "",
                });
            }
            catch (ex) {
                res.send({
                    status: "error",
                    msg: "Invalid login info",
                    resStatus: 400,
                });
            }
        }
        else {
            res.send({
                status: "error",
                msg: "Invalid login info 2",
                resStatus: 400,
            });
        }
    }
    else {
        res.send({
            status: "error",
            msg: "Invalid login info",
            resStatus: 400,
        });
    }
});
exports._login = _login;
const _forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const crypt = new guard_1.Crypt();
        const randomPassword = (yield (randomNumber(100000, 999999))).toString();
        const password = yield crypt.hash(randomPassword);
        const update = yield (0, auth_1.forgotPassword)(req.body.email, password);
        if (update['status'] === 'ok') {
            mail_1.Mailer.send({
                to: `${update["msg"]} <${req.body.email}>`,
                subject: "New Password",
                template: "forgotPassword",
                text: `Your user name is ${update["msg"]} and password is ${randomPassword}. Please change your pssword after your first login.`,
                data: {
                    user: update["msg"],
                    newPassword: randomPassword
                }
            }).then();
            //log.resStatus = 200;
            resolve({
                "status": "ok",
                "data": "",
                "msg": "If e-mail exists, new password will be sent."
            });
        }
        else {
            //log.resStatus = 200;
            resolve({
                "status": "ok",
                "data": "",
                "msg": "If e-mail exists, new password will be sent."
            });
        }
    }));
});
exports._forgotPassword = _forgotPassword;
// https://stackoverflow.com/questions/71270087/res-status-send-not-working-correctly-in-promise-all
//# sourceMappingURL=post.js.map