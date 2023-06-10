import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';

export interface COMPANY {
    "_id"?: ObjectId;
    "name"?: string;
    "image"?: string;
    "type"?: string;
    "isBookmarked"?: Boolean;
}

const collectionRead = mongodbRead.collection('m_companies');
const collectionWrite = mongodbWrite.collection('m_companies');

export const getCompanies = async (): Promise<any> => {
    return collectionRead.find({"type": "Company"}).toArray()
}

export const getCompanyWithId = async (company_id: ObjectId): Promise<any> => {
  return collectionRead.findOne({"_id": company_id});
}

export const updateCompanyBookmark = async (company: COMPANY): Promise<any> => {
  return collectionRead.updateOne(
    {
    "_id": company._id
    },
    {
      "$set": {
        "isBookmarked": company.isBookmarked
      }
    }
    );
}

export const getUserCompanies = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const filterCompanies = async (name?): Promise<any> => {

    // const {
    //   _id,
    //   name,
    //   image,
    //   about,
    //   connection_count,
    //   location
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
  
    if (name) {
      filter["name"] = { $regex: new RegExp(`${name}`, "i") };
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
                "name": 1,

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
