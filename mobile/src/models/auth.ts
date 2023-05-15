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
const collectionRead = mongodbRead.collection('members');
const collectionWrite = mongodbWrite.collection('members');

export const signup = async (signupInfo: ISIGNUP) => {

  // const emailRegex = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9_\-]@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]\.[a-zA-Z]+$', 'gm');
  // if (emailRegex.test(signupInfo.email)) {

  // }

  const emailExists = await memberEmailExists(signupInfo.email);
console.log("emailex",emailExists)
  if (emailExists == null) {


    const memberData: IMEMBER = {
      "name": signupInfo.name,
      "surname": signupInfo.surname,
      "username": signupInfo.username,
      "email": signupInfo.email,
      "password": signupInfo.hashedPassword,
      "createdAt": new Date().getTime(),
    }

    const member = await createMember(memberData);

    console.log("member",member)
   
    return {
      "status": "ok",
      "": "msg",
    }

  }
  else {
    return {
      "status": "error",
      "msg": "Email exists"
    };
  }

}

export const forgotPassword = async (email: string, hashedPassword: string): Promise<any> => {

  const user = await checkEmail(email);

  const result = {
    "status": "ok",
    "msg": ""
  };

  if (user) {

    updatePasswordByUserId(user._id, hashedPassword).then();

    result.msg = `${user.surname.toUpperCase()} ${user.name}`;

  }
  else {
    result.status = 'error';
    result.msg = "Email doesn\'t exists";
  }

  return Promise.resolve(result);
}


export const memberEmailExists = async (email: string): Promise<any> => {
    return collectionRead.findOne({ "email": email });
}

export const createMember = async (memberData: IMEMBER): Promise<any> => {
    return collectionWrite.insertOne(memberData);
}

export const checkEmail = async (email: string): Promise<any> => {
  const user = await collectionRead.findOne(
      {
          "email": email
      },
      {
          "projection": {
              "_id": 1,
              "password": 1,
              "name": 1,
              "surname": 1,
              "username": 1,
          }
      }
  )

  return Promise.resolve(user);

}

export const updatePasswordByUserId = async (userId: ObjectId, hashedPassword: string): Promise<any> => {
  return collectionWrite.findOneAndUpdate(
      { "_id": userId },
      {
          "$set": {
              "password": hashedPassword
          }
      }
  )
}