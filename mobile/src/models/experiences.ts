import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface EXPERIENCE {
    "_id"?: ObjectId;
    "user_id"?: ObjectId;
    "name"?: string;
    "company_id"?: ObjectId;
    "establishment"?: string;
    "range"?: Date;
    "location"?: string;
    "external"?: boolean;
    
}
const collectionRead = mongodbRead.collection('experiences');
const collectionWrite = mongodbWrite.collection('experiences');

export const getExperiences = async (): Promise<any> => {
    return collectionRead.find().toArray()
}

export const getCompanyExperienceCount = async (company_id: ObjectId): Promise<any> => {
  let companyExperienceCount = await getCompanyUsers(company_id);
  return {
    "count": companyExperienceCount.length
  }
}

export const createExperience = async (experience: EXPERIENCE): Promise<any> => {
  return collectionWrite.insertOne(experience)
}

export const updateExperience = async (experience: EXPERIENCE): Promise<any> => {
  return collectionWrite.updateOne({"_id": experience._id},{"$set": experience})
}

export const deleteExperience = async (experienceId: ObjectId): Promise<any> => {
  let result = await collectionWrite.deleteOne({"_id": experienceId, "external": true})

  if(result && result.deletedCount == 1){
    return Promise.resolve({
      "status": "ok",
      "msg": "Experience is deleted successfully"
    })
  } else {
    return Promise.resolve({
      "status": "error",
      "msg": "Experience could not be deleted"
    })
  }
}

export const getUserExperiences = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const filterExperiences = async (params: EXPERIENCE): Promise<any> => {

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
              '$addToSet': '$user_id'
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
    experiences.split(",").map(experience => {
      let obj = {
        "name": {
          '$regex': new RegExp(`${experience}`, 'i')
        }
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
          '$project': {
            '_id': 1, 
            'name': {
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
                'name': {
                    '$push': '$name'
                }
            }
        }
    ]
    ).toArray();
  }