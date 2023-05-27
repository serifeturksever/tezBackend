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
const languages_1 = require("../../models/languages");
// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
const _get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, languages_1.getLanguages)();
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._get = _get;
//# sourceMappingURL=get.js.map