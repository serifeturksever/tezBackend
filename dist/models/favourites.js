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
exports.updateFav = exports.getUserAsFav = exports.getUserFavs = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection("favourites");
const collectionWrite = app_1.mongodbWrite.collection("favourites");
const getUserFavs = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "user_id": userId }).toArray();
});
exports.getUserFavs = getUserFavs;
const getUserAsFav = (favId) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.find({ "fav_id": favId }).toArray();
});
exports.getUserAsFav = getUserAsFav;
const createFav = (favourite) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.insertOne(favourite);
});
const deleteFav = (favourite) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.deleteOne({
        "user_id": favourite.user_id,
        "fav_id": favourite.fav_id,
    });
});
const updateFav = (favourite) => __awaiter(void 0, void 0, void 0, function* () {
    let _checkFav = yield checkFav(favourite);
    if (!_checkFav) {
        yield createFav(favourite);
        return "data created";
    }
    else {
        yield deleteFav(favourite);
        return "data deleted";
    }
});
exports.updateFav = updateFav;
const checkFav = (favourite) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({
        "user_id": favourite.user_id,
        "fav_id": favourite.fav_id,
    }, {
        "projection": {
            "_id": 1,
        },
    });
});
//# sourceMappingURL=favourites.js.map