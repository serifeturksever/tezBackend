"use strict";
// Tamamlanacak
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
exports._updateFav = void 0;
const favourites_1 = require("../../models/favourites");
const mongodb_1 = require("mongodb");
const _updateFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fav = {
        "user_id": new mongodb_1.ObjectId(req.body.userId),
        "fav_id": new mongodb_1.ObjectId(req.body.favId),
    };
    let data = yield (0, favourites_1.updateFav)(fav);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._updateFav = _updateFav;
//# sourceMappingURL=post.js.map