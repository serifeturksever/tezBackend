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
const users_1 = require("../../models/users");
// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
const _get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user içi");
    let dummy_user = {};
    let data = yield (0, users_1.getUsers)(dummy_user);
    if (data) {
        res.send(data);
    }
    else {
        console.log("data yok");
    }
    // return new Promise((resolve, reject) => {
    //     // let data = getUsers("Murat Osman ÜNALIR")
    //     // console.log("usergetici",JSON.stringify(data))
    //     // if (1) {
    //     //     // return the todo
    //     //     let obj={name:"burhan"}
    //     //     resolve(obj);
    //     // } else {
    //     //     // return an error
    //     //     reject(`error`);
    //     // }
    //     try {
    //         resolve("merhaba ben user")    
    //     } catch (error) {
    //         console.log("ERROR! -> ", error)
    //     }
    // })
});
exports._get = _get;
//# sourceMappingURL=get.js.map