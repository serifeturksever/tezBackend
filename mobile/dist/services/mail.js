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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const app_1 = require("../app");
const bent_1 = __importDefault(require("bent"));
exports.Mailer = new (class {
    send(mail) {
        console.log("BURHAN DÜNDAR MAİL", mail);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let request = (0, bent_1.default)(app_1.VARIABLES.MAILER_HOST, "POST", "json", 200);
                let result = yield request("mail/addToDb", {
                    mail,
                });
                console.log("result: ", result);
                resolve({});
            }
            catch (error) {
                console.log("Mail send error");
            }
        }));
    }
})();
//# sourceMappingURL=mail.js.map