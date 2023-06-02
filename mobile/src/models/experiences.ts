import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface EDUCATION {
    "_id"?: ObjectId;
    "user_id"?: ObjectId;
    "name"?: string;
    "company_id"?: ObjectId;
    "establishment"?: string;
    "date"?: Date;
    "location"?: string;
    
}

// FIXME: Burada company_id alındı company_name yerine. Ya ikisi eklenecek ya da company_name company_id ile alınacak

const collectionRead = mongodbRead.collection('m_experiences');
const collectionWrite = mongodbWrite.collection('m_experiences');

export const getExperiences = async (): Promise<any> => {
    return collectionRead.find().toArray()
}

export const getUserExperiences = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const filterExperiences = async (params: EDUCATION): Promise<any> => {

    const {
        name,
      // company_id,
    //   establishment,
      location
    } = params;
  
    // let { dataCount } = params;
    // let { startData } = params;
  
    // if (!dataCount) {
    //   dataCount = 1
    // }
    // else if (dataCount > 10000) {
    //   dataCount = 10000;
    // }
  
    let filter = {}; // "company_id":company_id,
  
    if (name) {
      filter["name"] = { $regex: new RegExp(`${name}`, "i") };
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
                "_id": 1,
                "name": "$_id",
                "company_id": 1,
                "establishment": 1,
                "location": 1,
                "date": 1
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

  export const getCompanyUsers = async (company_id: ObjectId): Promise<any> => {
    let data = await collectionRead.aggregate(
      [
        {
          '$match': {
            'company_id': company_id
          }
        }, {
          '$group': {
            '_id': '$company_id', 
            'users': {
              '$push': '$user_id'
            }
          }
        }, {
          '$project': {
            '_id': 0
          }
        }
      ]
    ).toArray();

    let result = data[0] ? data[0]["users"] : []
    return Promise.resolve(result) 
}


