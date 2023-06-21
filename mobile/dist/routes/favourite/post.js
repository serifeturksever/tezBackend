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
exports._memberFollowers = exports._getBookmarkedUsers = exports._getMemberFavAsUserIds = exports._updateFav = void 0;
const favourites_1 = require("../../models/favourites");
const mongodb_1 = require("mongodb");
const _updateFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fav = {
        "user_id": new mongodb_1.ObjectId(req.body.user_id),
        "fav_id": new mongodb_1.ObjectId(req.body.fav_id),
        "fav_type": req.body.fav_type
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
const _getMemberFavAsUserIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let obj = {
        "user_id": new mongodb_1.ObjectId(req.body.user_id),
        "fav_type": req.body.fav_type
    };
    let data = yield (0, favourites_1.getMemberFavAsUserIds)(obj.user_id, obj.fav_type);
    if (data) {
        if (data[0]) {
            res.send(data[0].favs);
        }
    }
    else {
        console.log("data yok");
    }
});
exports._getMemberFavAsUserIds = _getMemberFavAsUserIds;
const _getBookmarkedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let obj = {
        "user_id": new mongodb_1.ObjectId(req.body.user_id),
        "fav_type": req.body.fav_type
    };
    let data = yield (0, favourites_1.getBookmarkedUsers)(obj.user_id, obj.fav_type);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._getBookmarkedUsers = _getBookmarkedUsers;
const _memberFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let obj = {
        "fav_id": new mongodb_1.ObjectId(req.body.fav_id),
        "fav_type": req.body.fav_type
    };
    let data = yield (0, favourites_1.memberFollowers)(obj.fav_id, obj.fav_type);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._memberFollowers = _memberFollowers;
//# sourceMappingURL=post.js.map