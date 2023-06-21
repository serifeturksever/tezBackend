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
exports._get = exports._getAllMails = void 0;
const microServices_1 = require("../../services/microServices");
const mail_1 = require("../../models/mail");
const _getAllMails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let mails = yield (0, mail_1.getMails)();
    if (mails) {
        res.send({ mails });
    }
    else {
        console.log("data yok");
    }
});
exports._getAllMails = _getAllMails;
const _get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, microServices_1.ServicesRequest)(null, null, "MOBILE", "user/", "GET", {}, {
        "requestFromInside": "ms",
        "ms": "MAILER"
    });
    res.send({ "status": data });
});
exports._get = _get;
//# sourceMappingURL=get.js.map