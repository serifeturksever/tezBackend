import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface ISIGNUP {
  "fullname": string;
  "username": string;
  "hashedPassword": string;
  "email": string;
}

export interface IMEMBER {
    "_id"?: ObjectId;
    "fullname": string;
    "username": string;
    "email": string;
    "password": string;
    "createdAt": number;
}
const collectionRead = mongodbRead.collection('members');
const collectionWrite = mongodbWrite.collection('members');

export const signup = async (signupInfo: ISIGNUP) => {

  const emailRegex = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9_\-]@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]\.[a-zA-Z]+$', 'gm');
  if (emailRegex.test(signupInfo.email)) {

  }

  const emailExists = await memberEmailExists(signupInfo.email);
  if (emailExists == null) {


    const memberData: IMEMBER = {
      "fullname": signupInfo.fullname,
      "username": signupInfo.username,
      "email": signupInfo.email,
      "password": signupInfo.hashedPassword,
      "createdAt": new Date().getTime(),
    }

    const member = await createMember(memberData);
   
    return {
      "status": "ok",
      "msg": "success",
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

    result.msg = `${user.fullname}`;

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
              "fullname": 1,
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

export const getHashedPassword = async (userId: string): Promise<any> => {
  const user = await collectionRead.findOne(
      {
          "_id": new ObjectId(userId),
         // "company_id": new ObjectId(companyId)
      },
      {
          "projection": {
              "_id": 0,
              "password": 1
          }
      }
  )

  const password = user ? user.password : "";
  return Promise.resolve(password);

}

export const updatePassword = async (userId: string, hashedPassword: string): Promise<any> => {
  const result = {
      "status": "error",
      "msg": ""
  }

  const checkUser = await getUserById(
      new ObjectId(userId)
  )

  if (!checkUser) {
      result.status = "User does not exist";
  }
  else {
      collectionWrite.findOneAndUpdate(
          { "_id": new ObjectId(userId) },
          {
              "$set": {
                  "password": hashedPassword,
                  'updatedAt': new Date().getTime()
              }
          }
      ).then();
      result.status = "ok";
  }

  return Promise.resolve(result);
}

export const getUserById = async (userId: ObjectId, companyId: ObjectId | null = null): Promise<any> => {

  let a = await collectionRead.findOne(
    { "_id": userId }
  );
  return Promise.resolve(a)
}