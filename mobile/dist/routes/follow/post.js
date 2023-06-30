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
exports._createFollow = void 0;
const mongodb_1 = require("mongodb");
const follows_1 = require("../../models/follows");
// export const _getUserFollowsAsIdArray = async(req,res) => {
//     let follow = {
//         "user_id": new ObjectId(req.body.userId),
//     }
//     let data = await createFollow(follow)
//     if(data){res.send(data)} else {console.log("data yok")}
// }
const _createFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let follow = {
        "user_id": new mongodb_1.ObjectId(req.body.userId),
        "followed_id": new mongodb_1.ObjectId(req.body.followedId),
    };
    let data = yield (0, follows_1.createFollow)(follow);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
});
exports._createFollow = _createFollow;
//# sourceMappingURL=post.js.map