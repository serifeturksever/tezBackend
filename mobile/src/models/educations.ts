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

const collectionRead = mongodbRead.collection('educations');
const collectionWrite = mongodbWrite.collection('educations');

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
      //user_id,
      company_id,
      employment_id,
      location,
      min_date,
      max_date,
    //   image,
    //   about,
    //   connection_count,
    //   location
    } = params;
  
    // let { dataCount } = params;
    // let { startData } = params;
  
    // if (!dataCount) {
    //   dataCount = 1
    // }
    // else if (dataCount > 10000) {
    //   dataCount = 10000;
    // }
  
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

      // ! datelere gore filter yapılacak.
    //   let and: any = []
    //   if (min_date && max_date) {
    //     and.push(
    //         {"start_date": {$gte: min_date}},
    //         {"end_date": {$lte: max_date}},
    //     )
    // }
    // else if (min_date && !max_date) {
    //     filter["createdAt"] = {
    //         $gte: min_date
    //     }
    // }
    // else if (!min_date && max_date) {
    //     filter["createdAt"] = {
    //         $lte: max_date
    //     }
    // }

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
            // { $skip: startData ? startData : 0 },
            // { $limit: dataCount }
          ],
        //   'count': [
        //     {
        //       '$match': filter
        //     }, {
        //       '$count': 'count'
        //     }
        //   ]
        }
      }
    ])
      .toArray()
  
    return Promise.resolve(value);
  }
