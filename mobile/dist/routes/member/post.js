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
exports._connectAccountWithLinkedIn = void 0;
// import { filterMembers, getCompanyMembersAsUserObj } from '../../models/members';
const mongodb_1 = require("mongodb");
const members_1 = require("../../models/members");
// What types of POST should be included ?
const _connectAccountWithLinkedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // bu metoda post atılma şartı ön yüzde mail ile linkedin mail aynı olmalı
    let [memberId, profileLink] = [req.body.memberId, req.body.profileLink];
    let data = yield (0, members_1.connectAccountWithLinkedIn)(new mongodb_1.ObjectId(memberId), profileLink);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    } // success veya error dönecek burdan
});
exports._connectAccountWithLinkedIn = _connectAccountWithLinkedIn;
//# sourceMappingURL=post.js.map