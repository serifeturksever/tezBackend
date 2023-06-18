import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';
import { MailOptions } from 'nodemailer/lib/json-transport';

// export interface MAIL {
//     from: string;
//     to: string;
//     subject: string;
//     text: string;
//     html: string;
// }

const collectionRead = mongodbRead.collection('mail');
const collectionWrite = mongodbWrite.collection('mail');

export const getMails = async (): Promise<any> => {
  return collectionRead.find().toArray()
}

export const createMail = async (mail: MailOptions): Promise<any> => {
    return collectionWrite.insertOne(mail);
  }