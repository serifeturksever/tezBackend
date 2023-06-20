import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';
import { MailOptions } from 'nodemailer/lib/json-transport';

const collectionRead = mongodbRead.collection('mail');
const collectionWrite = mongodbWrite.collection('mail');

export const getMails = async (): Promise<any> => {
  return collectionRead.find().toArray()
}

export const createMail = async (mail: MailOptions): Promise<any> => {
    return collectionWrite.insertOne(mail);
  }