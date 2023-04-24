import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface USER {
    "_id"?: ObjectId;
    "full_name": string;
    "image": string;
    "about": string;
    // "connection_count": string; bu olacak mı??
    "location": string;
}

const collectionRead = mongodbRead.collection('users');
const collectionWrite = mongodbWrite.collection('users');

export const getUsers = async (): Promise<any> => {
    return collectionRead.find({}).toArray()
}
