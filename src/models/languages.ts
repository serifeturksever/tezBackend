import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface LANGUAGE {
    "_id"?: ObjectId;
    "title": string;
    "user_id": ObjectId;
    "level": string;
    
}

const collectionRead = mongodbRead.collection('languages');
const collectionWrite = mongodbWrite.collection('languages');

export const getLanguages = async (): Promise<any> => {
    return collectionRead.find({}).toArray()
}
