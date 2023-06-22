import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface COURSE {
    "_id"?: ObjectId;
    "title"?: string;
    "user_id"?: ObjectId;
    "company_id"?: ObjectId;
    
}

const collectionRead = mongodbRead.collection('courses');
const collectionWrite = mongodbWrite.collection('courses');

export const getCourses = async (): Promise<any> => {
    return collectionRead.find().toArray()
}

export const getUserCourses = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const filterCourses = async (title?,company_id?): Promise<any> => {
  
    let filter = {
        "company_id": company_id
    };
  
    if (title) {
      filter["title"] = { $regex: new RegExp(`${title}`, "i") };
    }
    let value = await collectionRead.aggregate([
      {
        $facet: {
          "data": [
            {
              $match: filter
            },
            {
              "$project": {
                "_id": 0,
                "id": "$_id",
                "title": 1,

              }
            },
          ],
        }
      }
    ])
      .toArray()
  
    return Promise.resolve(value);
  }
