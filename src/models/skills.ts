import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface SKILL {
    "_id"?: ObjectId;
    "title": string;
    "user_id": ObjectId
    
}

const collectionRead = mongodbRead.collection('skills');
const collectionWrite = mongodbWrite.collection('skills');

export const getSkills = async (): Promise<any> => {
    return collectionRead.find({}).toArray()
}
