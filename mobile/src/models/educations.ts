import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface EDUCATION {
    "_id"?: ObjectId;
    "title"?: string;
    "user_id"?: ObjectId;
    "company_id"?: ObjectId;
    "employment_id"?: ObjectId;
    "location"?: ObjectId;
    "min_date"?: Date;
    "max_date"?: Date;
    
}

const collectionRead = mongodbRead.collection('m_educations');
const collectionWrite = mongodbWrite.collection('m_educations');

export const getEducations = async (): Promise<any> => {
    return collectionRead.find().toArray()
}

export const getUserEducations = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const filterEducations = async (params: EDUCATION): Promise<any> => {

    const {
      _id,
      title,
      company_id,
      employment_id,
      location,
      min_date,
      max_date,
    } = params;
  
    let filter = {
        "company_id":company_id,
        "employment_id":employment_id,
    };
  
    if (title) {
      filter["title"] = { $regex: new RegExp(`${title}`, "i") };
    }
  
    if (location) {
        filter["location"] = { $regex: new RegExp(`${location}`, "i") };
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
                "location": 1,
                "user_id": 1,
                "company_id": 1,
                "employment_id": 1,
                "start_date": 1,
                "end_date": 1,

              }
            },
          ],
        }
      }
    ])
      .toArray()
  
    return Promise.resolve(value);
  }
