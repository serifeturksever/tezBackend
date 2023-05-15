'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Crypt = void 0;
const crypto = __importStar(require("crypto"));
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
// export interface IGuard {
//   ip: string;
//   header: object;
//   source: string;
//   origin: string;
//   acceptLanguage: string;
//   token: string;
//   refreshToken: string;
//   payload: object;
// }
// export interface IToken {
//   userId: string;
//   userName?: string;
// }
const randomNumber = require("random-number-csprng");
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
class Crypt {
    constructor() {
        this.key = Buffer.from(key);
        this.iv = iv;
        this.ALGO = 'aes-256-cbc';
        this.saltRounds = 12;
        // private jwtSecret = VARIABLES.JWT!.toString();
        // private jwtRefreshSecret = VARIABLES.JWTREFRESH!.toString();
        this.encrpyt = (message) => {
            const cipher = crypto.createCipheriv(this.ALGO, this.key, this.iv);
            let enc = cipher.update(message, 'utf8', 'base64');
            enc += cipher.final('base64');
            return enc;
        };
        this.decrypt = (enc) => {
            const decipher = crypto.createDecipheriv(this.ALGO, this.key, this.iv);
            let str = decipher.update(enc, 'base64', 'utf8');
            str += decipher.final('utf8');
            return str;
        };
    }
    hash(text) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(text, this.saltRounds)
                .then(hash => {
                resolve(hash);
            })
                .catch(err => {
                reject(err.toString());
            });
        });
    }
    compareHashes(text, encryptText) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(text, encryptText, function (err, snc) {
                if (err) {
                    resolve(false);
                }
                else
                    resolve(snc);
            });
        });
    }
    createToken(prefix = "t.") {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const rndNumber = yield randomNumber(100000, 999999);
            const token = Math.random().toString(36).substring(7) + rndNumber.toString();
            const uuid = (0, uuid_1.v4)();
            resolve(prefix + uuid + "." + token);
        }));
    }
    createCookie(res, key, value, expires) {
        const expiresAt = expires * 24 * 3600000;
        const cookieOptions = {
            // "domain": "34.90.67.225",
            // "path": "/admin", 
            "signed": true,
            "httpOnly": false,
            // "maxAge": expiresAt, // maxAge: 86_400_000, // 1 gun
            "expires": new Date(Date.now() + expiresAt),
            "encode": (e) => e,
            // "secure": true,
            // "sameSite": true
        };
        res.clearCookie(key);
        res.cookie(key, value.toString(), cookieOptions);
        return {};
    }
}
exports.Crypt = Crypt;
//# sourceMappingURL=guard.js.map