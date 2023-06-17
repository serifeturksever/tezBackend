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
exports._sendUpdatePasswordMail = exports._sendForgotPasswordMail = exports._sendRegisterMail = void 0;
const mailService_1 = require("../../services/mailService");
let emailer = new mailService_1.Emailer();
// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
const _sendRegisterMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    emailer.sendEmail((0, mailService_1.newUserEmailTemplate)(req.body.email, req.body.username));
    res.send({ "status": "ok" });
});
exports._sendRegisterMail = _sendRegisterMail;
const _sendForgotPasswordMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    emailer.sendEmail((0, mailService_1.forgotPasswordEmailTemplate)(req.body.email, req.body.password));
    res.send({ "status": "ok" });
});
exports._sendForgotPasswordMail = _sendForgotPasswordMail;
const _sendUpdatePasswordMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("postmail**********", req.body);
    emailer.sendEmail((0, mailService_1.updatePasswordEmailTemplate)(req.body.email));
    res.send({ "status": "ok" });
});
exports._sendUpdatePasswordMail = _sendUpdatePasswordMail;
//# sourceMappingURL=post.js.map