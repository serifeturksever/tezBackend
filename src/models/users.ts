import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface USER {
    "_id"?: ObjectId;
    "full_name"?: string;
    "image": string;
    "about": string;
    "connection_count": string; 
    "location"?: string;
}

const collectionRead = mongodbRead.collection('users');
const collectionWrite = mongodbWrite.collection('users');

// export const getUsers = async (): Promise<any> => {
//     return collectionRead.find({}).toArray()
// }

export const getUsers = async (full_name?,location?): Promise<any> => {

    // const {
    //   location,
    //   full_name,
    // } = params;
  
    // let { dataCount } = params;
    // let { startData } = params;
  
    // if (!dataCount) {
    //   dataCount = 1
    // }
    // else if (dataCount > 10000) {
    //   dataCount = 10000;
    // }
  
    let filter = {};
  
    if (full_name) {
      filter["full_name"] = { $regex: new RegExp(`${full_name}`, "i") };
    }
    if (location) {
        filter["location"] = { $regex: new RegExp(`${location}`, "i") };
      }
  
   console.log("flter",filter)

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
                "full_name": 1,
                "location": 1,

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
    ]).toArray()
   // console.log("value",JSON.stringify(value))
    return Promise.resolve(value);
  }
