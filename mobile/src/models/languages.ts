import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface LANGUAGE {
    "_id"?: ObjectId;
    "title": string;
    "user_id": ObjectId;
    "level": string;
    
}

const collectionRead = mongodbRead.collection('languages');
const collectionWrite = mongodbWrite.collection('languages');

export const getLanguages = async (): Promise<any> => {
    return collectionRead.find().toArray()
}

export const getUserLanguages = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const filterLanguages = async (params: LANGUAGE): Promise<any> => {

    const {
      _id,
      title,
      user_id,
      level,
    } = params;
    let filter = {
      "_id": _id,
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
                "user_id": 1,
                "level": 1,

              }
            },
          ],
        }
      }
    ])
      .toArray()
  
    return Promise.resolve(value);
  }


  export const getFilteredLanguages = async (languages: string): Promise<any> => {
    let filter = {}
    let languagesObjArr = []
    languages.split(",").map(language => {
      let obj = {
        "title": {
          '$regex': new RegExp(`${language}`, 'i')
        }
      }
      languagesObjArr.push(obj)
    })

    if(languagesObjArr.length > 1){
      filter["$or"] = languagesObjArr
    } else {
      filter = languagesObjArr[0]
    }

    return collectionRead.aggregate(
      [
        {
          '$project': {
            '_id': 1, 
            'title': {
              '$toLower': '$title'
            }, 
            'user_id': 1
          }
        },
        {
            '$match': filter
        }, {
            '$group': {
                '_id': '$user_id', 
                'title': {
                    '$push': '$title'
                }
            }
        }
    ]
    ).toArray();
  }