import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface USER {
    "_id"?: ObjectId;
    "full_name"?: string;
    "image"?: string;
    "about"?: string;
    "connection_count"?: string; 
    "location"?: string;
}

const collectionRead = mongodbRead.collection('m_users');
const collectionWrite = mongodbWrite.collection('m_users');

// TODO: Pagination Yapısı için bir sistem düşünülecek -> startData, dataCount, limit tarzı
// FIXME: userId parametre olarak objectId mi alsın ?
// Company içerisinde userId yok ?

export const getUsers = async (): Promise<any> => {
  return collectionRead.find().toArray()
}

export const filterUsers = async (params: USER): Promise<any> => {
    const {
      full_name,
      about,
      location,
      // connection_count -> ekle
    } = params;
  
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
    if (about) {
      filter["about"] = { $regex: new RegExp(`${about}`, "i") };
    }
    if (location) {
        filter["location"] = { $regex: new RegExp(`${location}`, "i") };
      }
  
   console.log("filter",filter)

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
                "image": 1,
                "about": 1,
                "connection_count": 1,
                "location": 1
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
   console.log("value", value[0].data)
    
   // eğer bu filtreye uygun kullanıcı yoksa array boş geliyor
    return Promise.resolve(value[0].data);
  }

