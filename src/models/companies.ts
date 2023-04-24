import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface COMPANY {
    "_id"?: ObjectId;
    "name": string;
    "image": string;
    
}

const collectionRead = mongodbRead.collection('companies');
const collectionWrite = mongodbWrite.collection('companies');

export const getCompanies = async (): Promise<any> => {
    return collectionRead.find({}).toArray()
}
