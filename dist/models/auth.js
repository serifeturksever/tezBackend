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
exports.createMember = exports.memberEmailExists = exports.signup = void 0;
const app_1 = require("../app");
const collectionRead = app_1.mongodbRead.collection('member');
const collectionWrite = app_1.mongodbWrite.collection('member');
const signup = (signupInfo) => __awaiter(void 0, void 0, void 0, function* () {
    // const emailRegex = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9_\-]@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]\.[a-zA-Z]+$', 'gm');
    // if (emailRegex.test(signupInfo.email)) {
    // }
    const emailExists = yield (0, exports.memberEmailExists)(signupInfo.email);
    if (emailExists == null) {
        let month = (new Date().getMonth() + 1).toString();
        month = month.length > 1 ? month : "0" + month;
        const memberData = {
            "name": signupInfo.name,
            "surname": signupInfo.surname,
            "username": signupInfo.username,
            "email": signupInfo.email,
            "password": signupInfo.hashedPassword,
            "createdAt": new Date().getTime(),
        };
        const member = yield (0, exports.createMember)(memberData);
        return {
            "status": "ok",
            "": "msg",
            "userId": "" + member.msg.id,
            "userName": member.msg.username,
        };
    }
    else {
        return {
            "status": "error",
            "msg": "Email exists"
        };
    }
});
exports.signup = signup;
// export const forgotPassword = async (email: string, hashedPassword: string): Promise<any> => {
//   const user = await getUserIdByEmail(email);
//   const result = {
//     "status": "ok",
//     "msg": ""
//   };
//   if (user) {
//     updatePasswordByUserId(user._id, hashedPassword).then();
//     result.msg = `${user.surname.toUpperCase()} ${user.name}`;
//   }
//   else {
//     result.status = 'error';
//     result.msg = "Email doesn\'t exists";
//   }
//   return Promise.resolve(result);
// }
// export const getHashedPasswordByEmail = async (email: string): Promise<any> => {
//   const user = await getUserHashedPasswordByEmail(email);
//   if (user) {
//     const company = await getCompanyLoginInfo(user.company_id);
//     return Promise.resolve({
//       "status": "ok",
//       "userId": "" + user._id,
//       "userName": `${user.surname.toUpperCase()} ${user.name}`,
//       "userLanguage": user.language || "en",
//       "userRole": user.userRole,
//       "password": user.password,
//       "departmentIds": user.department_ids,
//       "companyId": "" + company._id,
//       "companyName": company.name,
//       "companyStatus": company.status,
//       "companyNextPaymentTryDate": company.nextPaymentTryDate,
//       "companyLogo": company.logo
//     })
//   }
//   else {
//     return Promise.resolve(null);
//   }
// }
const memberEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionRead.findOne({ "email": email });
});
exports.memberEmailExists = memberEmailExists;
const createMember = (memberData) => __awaiter(void 0, void 0, void 0, function* () {
    return collectionWrite.insertOne(memberData);
});
exports.createMember = createMember;
//# sourceMappingURL=auth.js.map