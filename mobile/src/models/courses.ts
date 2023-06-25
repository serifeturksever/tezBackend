import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface COURSE {
    "_id"?: ObjectId;
    "title"?: string;
    "user_id"?: ObjectId;
    "company_id"?: ObjectId;
    "company_name"?: string; 
    
}

const collectionRead = mongodbRead.collection('courses');
const collectionWrite = mongodbWrite.collection('courses');

export const getCourses = async (): Promise<any> => {
    return collectionRead.find().toArray()
}

export const getUserCourses = async (userId: ObjectId): Promise<any> => {
  // return collectionRead.find({"user_id": userId}).toArray()
  return collectionRead.aggregate(
    [
      {
        '$match': {
          'user_id': userId
        }
      }, {
        '$lookup': {
          'from': 'companies', 
          'localField': 'company_id', 
          'foreignField': '_id', 
          'as': 'company'
        }
      }, {
        '$addFields': {
          'company': {
            '$arrayElemAt': [
              '$company', 0
            ]
          }, 
          'company_name': {
            '$arrayElemAt': [
              '$company.name', 0
            ]
          }
        }
      }, {
        '$project': {
          '_id': 1, 
          'title': 1, 
          'user_id': 1, 
          'company_id': 1, 
          'company_name': '$company_name'
        }
      }
    ]
  ).toArray();
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
