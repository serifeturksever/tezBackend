import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface COURSE {
    "_id"?: ObjectId;
    "title"?: string;
    "user_id"?: ObjectId;
    "company_id"?: ObjectId;
    
}

const collectionRead = mongodbRead.collection('m_courses');
const collectionWrite = mongodbWrite.collection('m_courses');

export const getCourses = async (): Promise<any> => {
    return collectionRead.find().toArray()
}

export const getUserCourses = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const filterCourses = async (title?,company_id?): Promise<any> => {

    // const {
    //   _id,
    //   title,
    //   user_id,
    //   company_id,
   
    // } = params;
  
    // let { dataCount } = params;
    // let { startData } = params;
  
    // if (!dataCount) {
    //   dataCount = 1
    // }
    // else if (dataCount > 10000) {
    //   dataCount = 10000;
    // }
  
    let filter = {
        "company_id": company_id
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
                // "user_id": 1,
                // "company_id": 1,
                "title": 1,

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
