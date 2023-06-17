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
exports._get = void 0;
const microServices_1 = require("../../services/microServices");
// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
const _get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("mail get in get.ts");
    let data = yield (0, microServices_1.ServicesRequest)(null, null, "MOBILE", "user/", "GET", {}, {
        "requestFromInside": "ms",
        "ms": "MAILER"
    });
    console.log("a", data);
    // await fetch('10.22.168.184:3001/user')
    // .then((response) => response.json())
    // .then((body) => {
    //     console.log(body);
    // }); 
    res.send({ "status": data });
});
exports._get = _get;
//# sourceMappingURL=get.js.map