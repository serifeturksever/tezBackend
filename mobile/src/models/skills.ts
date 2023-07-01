import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface SKILL {
    "_id"?: ObjectId;
    "title": string;
    "user_id": ObjectId
    
}

const collectionRead = mongodbRead.collection('skills');
const collectionWrite = mongodbWrite.collection('skills');

export const getSkills = async (): Promise<any> => {
    return collectionRead.find({}).toArray()
}

export const getUserSkills = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const filterSkills = async (params: SKILL): Promise<any> => {

    const {
      _id,
      title,
      user_id,
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

              }
            },
          ],
        }
      }
    ])
      .toArray()
  
    return Promise.resolve(value);
  }

  export const getFilteredSkills = async (skills: string): Promise<any> => {
    let filter = {}
    let skillsObjArr = []
    skills.split(",").map(skill => {
      let obj = {
        "title": {
          '$regex': new RegExp(`${skill}`, 'i')
        }
      }
      skillsObjArr.push(obj)
    })

    if(skillsObjArr.length > 1){
      filter["$or"] = skillsObjArr
    } else {
      filter = skillsObjArr[0]
    }

    console.log(skills,skillsObjArr)

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