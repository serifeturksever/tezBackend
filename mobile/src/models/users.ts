import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';
import { getCompanyUsers, getFilteredExperiences } from './experiences';
import { getFilteredSkills } from './skills';
import { getFilteredLanguages } from './languages';

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

  

  export const getUserWithId = async (user_id: ObjectId): Promise<any> => {
    return collectionRead.find({"_id": user_id}).toArray()
  }

  export const getCompanyUsersAsUserObj = async (company_id: ObjectId): Promise<any> => {
    let users = []
    let companyUsers = await getCompanyUsers(company_id);
    for(let i=0;i<companyUsers.length;i++) {
      let user = await getUserWithId(companyUsers[i]);
      if(user[0]){
        users.push(user[0])
      }
    }
    return Promise.resolve(users);
  }

  export const getFilteredUsers = async (filterObj: Object): Promise<any> => { // verimli hale getirilecek

    let queryCount = Object.values(filterObj).filter(key => key != "").length;

    const filteredSkills = filterObj["skills"] != "" ? await getFilteredSkills(filterObj["skills"]) : []
    const filteredExperiences = filterObj["experiences"] != "" ? await getFilteredExperiences(filterObj["experiences"]) : []
    const filteredLanguages = filterObj["languages"] != "" ? await getFilteredLanguages(filterObj["languages"]) : []

    let mainSkillsArr = []
    let mainExperiencesArr = []
    let mainLanguagesArr = []

    if(filterObj["skills"] != "" && filteredSkills.length > 0){
    filteredSkills.map(skill => {
      if(skill["title"].length == filterObj["skills"].split(",").length){
        mainSkillsArr.push(skill["_id"].toString())
      }
    })
  }

    if(filterObj["experiences"] != "" && filteredExperiences.length > 0){
      filteredExperiences.map(experience => {
        if(experience["name"].length == filterObj["experiences"].split(",").length){
          mainExperiencesArr.push(experience["_id"].toString())
        }
      })
    }
    
    if(filterObj["languages"] != "" && filteredLanguages.length > 0){
      filteredLanguages.map(language => {
        if(language["title"].length == filterObj["languages"].split(",").length){
          mainLanguagesArr.push(language["_id"].toString())
        }
      })
    }

    let mergedAbilitiesArr = [...mainSkillsArr,...mainExperiencesArr,...mainLanguagesArr]

    let uniqueUserIds = [...new Set(mergedAbilitiesArr)];
    const elementCounts = uniqueUserIds.map(value => [value, mergedAbilitiesArr.filter(str => str === value).length]);
    let resultObj = elementCounts.filter(element => element[1] == queryCount)
    let result = resultObj.map(key => key[0])

    if(result.length == 0){
      return []
    }

    let users = []
    for(let i=0;i<result.length;i++){
      let user = await getUserWithId(new ObjectId(result[i]));
      if(user[0]){
        users.push(user[0])
      }
    }
    console.log("users",users)
    return Promise.resolve(users)
  }