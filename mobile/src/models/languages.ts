import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface LANGUAGE {
    "_id"?: ObjectId;
    "title": string;
    "user_id": ObjectId;
    "level": string;
    
}

const collectionRead = mongodbRead.collection('m_languages');
const collectionWrite = mongodbWrite.collection('m_languages');

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
      "_id": _id, //? bak buraya
    };
  
    if (title) {
      filter["title"] = { $regex: new RegExp(`${title}`, "i") };
    }
  
    // if (departmentName) {
    //   try {
    //     const checkDeparmentsName = await getDepartmentsByLikeName(company_id, departmentName);
    //     if (checkDeparmentsName.length > 0) {
    //       const deptIds = checkDeparmentsName.map(function (d: any) { return d._id; });
    //       filter["department_ids"] = { "$in": deptIds };
    //     } else {
    //       filter["department_ids"] = { "$in": [] };
    //     }
    //   }
    //   catch (e) {
    //     console.log("Department name error", e)
    //     filter["department_ids"] = { "$in": [] };
    //   }
    // }
  
    // if (crmId) {
    //   filter["crmId"] = { $regex: new RegExp(`${crmId}`, "i") };
    // }
  
    //

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

  export const getFilteredLanguages = async (languages: string): Promise<any> => {

    let languagesObjArr = []
    languages.split(",").map(skill => {
      let obj = {
        "title": skill
      }
      languagesObjArr.push(obj)
    })

    return collectionRead.aggregate(
      [
        {
            '$match': {
                '$or': languagesObjArr
            }
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
