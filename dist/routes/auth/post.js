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
exports._signup = void 0;
//import { requestChecker } from '../../app';
const guard_1 = require("../../services/guard");
const auth_1 = require("../../models/auth");
// import { getHashedPassword, updatePassword } from '../../models/users';
var randomNumber = require("random-number-csprng");
const _signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const p = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (repassword != password) {
            reject({
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
        if (register.status == "ok") {
            resolve({
                status: "ok",
                msg: "",
                //"token": guardData.token
            });
        }
        else {
            reject({
                status: "error",
                //"msg": saveCompany.msg
            });
        }
    }));
    p.then(data => {
        // 👇️ .then block ran:  Success message
        console.log('.then block ran: ', data);
    }).catch(err => {
        console.log('.catch block ran: ', err);
    });
});
exports._signup = _signup;
//# sourceMappingURL=post.js.map