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
exports._getUserAsFav = exports._getUserFavs = void 0;
const favourites_1 = require("../../models/favourites");
const mongodb_1 = require("mongodb");
const _getUserFavs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, favourites_1.getUserFavs)(new mongodb_1.ObjectId(req.body.userId), req.body.fav_type);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getUserFavs = _getUserFavs;
const _getUserAsFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, favourites_1.getUserAsFav)(new mongodb_1.ObjectId(req.body.favId));
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getUserAsFav = _getUserAsFav;
//# sourceMappingURL=get.js.map