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
exports._notifyFollowersByEmail = void 0;
const mongodb_1 = require("mongodb");
const notifications_1 = require("../../models/notifications");
const _notifyFollowersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    let notificationObj = {
        "user_id": new mongodb_1.ObjectId(req.body.user_id),
        "experiences": (_a = req.body.experiences) !== null && _a !== void 0 ? _a : [],
        "skills": (_b = req.body.skills) !== null && _b !== void 0 ? _b : [],
        "courses": (_c = req.body.courses) !== null && _c !== void 0 ? _c : [],
        "educations": (_d = req.body.educations) !== null && _d !== void 0 ? _d : [],
        "languages": (_e = req.body.languages) !== null && _e !== void 0 ? _e : []
    };
    let data = yield (0, notifications_1.notifyFollowerMembersAboutUpdates)(notificationObj);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._notifyFollowersByEmail = _notifyFollowersByEmail;
//# sourceMappingURL=post.js.map