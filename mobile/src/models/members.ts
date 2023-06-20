import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';
import { addMemberIdToUser, getUserIdWithProfileLink } from './users';
import { profile } from 'console';

export interface MEMBER {
    "_id": ObjectId;
    "fullname": string;
    "username": string;
    "email": string;
    "userId"?: string;
    "password"?: string;
    "isBookmarked"?: Boolean; 
}

const collectionRead = mongodbRead.collection('members');
const collectionWrite = mongodbWrite.collection('members');


export const getMembers = async (): Promise<any> => {
  return collectionRead.find().toArray()
}

export const isUsernameExist = async (username: string): Promise<any> => {
  return collectionRead.findOne(
    {
      "username": username
    },
    {
      "projection": {
        "_id": 1
      }
    }
  )
}

export const getCompanyWithId = async (company_id: ObjectId): Promise<any> => {
  return collectionRead.findOne({"_id": company_id});
}

export const addUserIdToMember = async (userId: ObjectId, memberId: ObjectId): Promise<any> => {
  return collectionWrite.updateOne(
    {
      "_id": memberId
    },
    {
      "$set": {
        "userId": userId
      }
    }
    );
}

export const connectAccountWithLinkedIn = async (memberId: ObjectId, profileLink: string): Promise<any> => {
  let relatedUserId = await getUserIdWithProfileLink(profileLink);
  console.log("relatedUserId ===> ",relatedUserId)
  if(relatedUserId){
    await Promise.all([
      addMemberIdToUser(memberId,profileLink),
      addUserIdToMember(relatedUserId["userId"],memberId)
    ])
    return Promise.resolve({"status": "ok", "msg": "success"})
  } else {
    return Promise.resolve({"status": "error", "msg": "Problem occured"})
  }
}

export const updateMemberBookmark = async (member: MEMBER): Promise<any> => {
  return collectionRead.updateOne(
    {
    "_id": member._id
    },
    {
      "$set": {
        "isBookmarked": member.isBookmarked
      }
    }
    );
}

export const getMemberIdWithEmail = async (memberEmail: string): Promise<any> => {
  return collectionRead.findOne(
    {
    "email": memberEmail
    },
    {
      "projection": {
        "memberId": "$_id"
      }
    }
    );
}

export const getMemberWithId = async (member_id: ObjectId): Promise<any> => {
  return collectionRead.findOne({"_id": member_id});
}