import { ObjectId } from "mongodb";
import { mongodbRead, mongodbWrite } from "../app";
import { EXPERIENCE } from "./experiences";
import { SKILL } from "./skills";
import { LANGUAGE } from "./languages";
import { EDUCATION } from "./educations";
import { COURSE } from "./courses";
import { getUserWithId } from "./users";

export interface FOLLOW {
    "member_id"?: ObjectId;
    "followed_id": ObjectId;
    "isAdded"?: boolean;  
}

const collectionRead = mongodbRead.collection("m_followers");
const collectionWrite = mongodbWrite.collection("m_followers");

export const getUserFollowings = async (memberId: ObjectId): Promise<any> => {
    return collectionRead.find({ "member_id": memberId }).toArray()
}

export const deleteFollow = async (follow: FOLLOW): Promise<any> => {
    return collectionWrite.deleteOne({ "member_id": follow.member_id, "followed_id": follow.followed_id })
}

export const updateFollow = async (follow: FOLLOW): Promise<any> => {
    if(follow.isAdded){
        let result = await collectionWrite.insertOne(follow);
        console.log(result)
        if(result.insertedId) {
            return Promise.resolve({
                "status": "ok",
                "actionType": "create",
                "msg": "Follow is created successfully"
            })
        } else {
            return Promise.resolve({
                "status": "error",
                "actionType": "create",
                "msg": "Follow could not be created"
            })
        }
    } else {
        let result = await deleteFollow(follow);
        if(result && result.deletedCount == 1) {
            return Promise.resolve({
                "status": "ok",
                "actionType": "delete",
                "msg": "Follow is deleted successfully"
            })
        } else {
            return Promise.resolve({
                "status": "error",
                "actionType": "delete",
                "msg": "Follow could not be deleted"
            })
        }
    }
}

export const getUserFollowingsAsIdArray = async (memberId: ObjectId): Promise<any> => {
    return collectionRead.aggregate(
        [
            {
                '$match': {
                    'member_id': memberId,
                }
            }, {
                '$group': {
                    '_id': '$member_id',
                    'followeds': {
                        '$push': '$followed_id'
                    }
                }
            }
        ]
    ).toArray();
}

export const getUserFollowers = async (followedId: ObjectId): Promise<any> => {
    return collectionRead.aggregate(
        [
            {
                '$match': {
                    'followed_id': followedId,
                }
            }, {
                '$group': {
                    '_id': '$followed_id',
                    'followers': {
                        '$push': '$member_id'
                    }
                }
            }
        ]
    ).toArray();
};

export const getNotifiedUsers = async (member_id: ObjectId): Promise<any> => {
    let users = []
    let data = (await getUserFollowingsAsIdArray(member_id))[0];
    if(data){
      for(let i = 0;i < data.followeds.length;i++){
        let user = await getUserWithId(data.followeds[i])
        users.push(user);
      }
    }
    return Promise.resolve(users)
  };