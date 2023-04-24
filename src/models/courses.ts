import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface COURSE {
    "_id"?: ObjectId;
    "title": string;
    "user_id": ObjectId;
    "company_id": ObjectId;
    
}

const collectionRead = mongodbRead.collection('courses');
const collectionWrite = mongodbWrite.collection('courses');

export const getCourses = async (): Promise<any> => {
    return collectionRead.find({}).toArray()
}
