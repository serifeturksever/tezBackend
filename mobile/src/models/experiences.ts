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
      location
    } = params;
    let filter = {}; 
  
    if (name) {
      filter["name"] = { $regex: new RegExp(`${name}`, "i") };
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
                "_id": 1,
                "name": "$_id",
                "company_id": 1,
                "establishment": 1,
                "location": 1,
                "date": 1
              }
            },
          ],
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



export const getFilteredExperiences = async (experiences: string): Promise<any> => {
    let filter = {}
    let experiencesObjArr = []
    experiences.split(",").map(skill => {
      let obj = {
        "name": skill
      }
      experiencesObjArr.push(obj)
    })

    if(experiencesObjArr.length > 1){
      filter["$or"] = experiencesObjArr
    } else {
      filter = experiencesObjArr[0]
    }

    return collectionRead.aggregate(
      [
        {
            '$match': filter
        }, {
            '$group': {
                '_id': '$user_id', 
                'name': {
                    '$push': '$name'
                }
            }
        }
    ]
    ).toArray();
  }