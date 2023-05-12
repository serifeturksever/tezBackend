import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface ISIGNUP {
  "name": string;
  "surname": string;
  "username": string;
  "hashedPassword": string;
  "email": string;
}

export interface IMEMBER {
    "_id"?: ObjectId;
    "name": string;
    "surname": string;
    "username": string;
    "email": string;
    "password": string;
    "createdAt": number;
}
const collectionRead = mongodbRead.collection('member');
const collectionWrite = mongodbWrite.collection('member');

export const signup = async (signupInfo: ISIGNUP) => {

  // const emailRegex = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9_\-]@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]\.[a-zA-Z]+$', 'gm');
  // if (emailRegex.test(signupInfo.email)) {

  // }

  const emailExists = await memberEmailExists(signupInfo.email);

  if (emailExists == null) {

    let month = (new Date().getMonth() + 1).toString();
    month = month.length > 1 ? month : "0" + month;

    const memberData: IMEMBER = {
      "name": signupInfo.name,
      "surname": signupInfo.surname,
      "username": signupInfo.username,
      "email": signupInfo.email,
      "password": signupInfo.hashedPassword,
      "createdAt": new Date().getTime(),
    }

    const member = await createMember(memberData);

   
    return {
      "status": "ok",
      "": "msg",
      "userId": "" + member.msg.id,
      "userName": member.msg.username,
    }

  }
  else {
    return {
      "status": "error",
      "msg": "Email exists"
    };
  }

}

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

export const memberEmailExists = async (email: string): Promise<any> => {
    return collectionRead.findOne({ "email": email });
}

export const createMember = async (memberData: IMEMBER): Promise<any> => {
    return collectionWrite.insertOne(memberData);
}