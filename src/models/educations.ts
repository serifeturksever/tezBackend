import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface EDUCATION {
    "_id"?: ObjectId;
    "title": string;
    "user_id": ObjectId;
    "company_id": ObjectId;
    "employment_id": ObjectId;
    "location": ObjectId;
    "start_date": Date;
    "end_date": Date;
    
}

const collectionRead = mongodbRead.collection('educations');
const collectionWrite = mongodbWrite.collection('educations');

export const getEducations = async (): Promise<any> => {
    return collectionRead.find({}).toArray()
}
