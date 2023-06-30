import { ObjectId } from "mongodb";
import { mongodbRead, mongodbWrite } from "../app";
import { EXPERIENCE } from "./experiences";
import { SKILL } from "./skills";
import { LANGUAGE } from "./languages";
import { EDUCATION } from "./educations";
import { COURSE } from "./courses";

export interface FOLLOW {
    "member_id"?: ObjectId;
    "followed_id": ObjectId;
}

const collectionRead = mongodbRead.collection("m_followers");
const collectionWrite = mongodbWrite.collection("m_followers");

export const getUserFollowings = async (memberId: ObjectId): Promise<any> => {
    return collectionRead.find({ "member_id": memberId }).toArray()
}

export const createFollow = async (follow: FOLLOW): Promise<any> => {
    let result = await collectionWrite.insertOne(follow);
    if(result.insertedId) {
        return Promise.resolve({
            "status": "ok",
            "msg": "Follow is created successfully"
        })
    } else {
        return Promise.resolve({
            "status": "error",
            "msg": "Follow could not be created"
        })
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