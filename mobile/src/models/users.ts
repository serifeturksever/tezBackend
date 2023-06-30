import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';
import { getCompanyUsers, getFilteredExperiences } from './experiences';
import { getFilteredSkills } from './skills';
import { getFilteredLanguages } from './languages';
import { AnyArray } from 'mongoose';

export interface USER {
    "_id"?: ObjectId;
    "full_name"?: string;
    "image"?: string;
    "about"?: string;
    "connection_count"?: string; 
    "location"?: string;
}

const collectionRead = mongodbRead.collection('users');
const collectionWrite = mongodbWrite.collection('users');

export const getUsers = async (): Promise<any> => {
  return collectionRead.find().toArray()
}

export const getUserFullName = async (userId: ObjectId): Promise<any> => {
  return collectionRead.findOne({"_id": userId},{"projection": {"_id": 0, "full_name": 1}})
}

export const getUserIdWithProfileLink = async (profileLink: string): Promise<any> => {
  return collectionRead.findOne(
    {
    "profileLink": profileLink
    },
    {
      "projection": {
        "_id": 0,
        "userId": "$_id"
      }
    }
    );
}

export const addMemberIdToUser = async (memberId: ObjectId,profileLink: string): Promise<any> => {
  return collectionWrite.updateOne(
    {
      "profileLink": profileLink
    },
    {
      "$set": {
        "memberId": memberId
      }
    }
    );
}

export const filterUsers = async (params: USER): Promise<any> => {
    const {
      full_name,
      about,
      location,
    } = params;
  
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
          ],
        }
      }
    ]).toArray()
    return Promise.resolve(value[0].data);
  }

  

  export const getUserWithId = async (user_id: ObjectId): Promise<any> => {
    return collectionRead.findOne({"_id": user_id});
  }

  export const getUsersWithUserIds = async (userIdArr: Array<string>): Promise<any> => {
    let users = []
    for(let i=0;i<userIdArr.length;i++){
      let user = await getUserWithId(new ObjectId(userIdArr[i]));
      users.push(user)
    }
    return users;
  }

  export const getCompanyUsersAsUserObj = async (company_id: ObjectId): Promise<any> => {
    let users = []
    let companyUsers = await getCompanyUsers(company_id);
    for(let i=0;i<companyUsers.length;i++) {
      let user = await getUserWithId(companyUsers[i])
      if(!users.includes(user)){
        users.push(user)
      }
    }
    return Promise.resolve(users);
  }

  export const getFilteredUsers = async (filterObj: Object): Promise<any> => {
    let queryCount = Object.values(filterObj).filter(key => key != "").length;

    const filteredSkills = filterObj["skills"] != "" ? await getFilteredSkills(filterObj["skills"]) : []
    const filteredExperiences = filterObj["experiences"] != "" ? await getFilteredExperiences(filterObj["experiences"]) : []
    const filteredLanguages = filterObj["languages"] != "" ? await getFilteredLanguages(filterObj["languages"]) : []

    const responses =  await Promise.all([
      getAbilityUserId(filterObj, "skills",filteredSkills),
      getAbilityUserId(filterObj, "experiences", filteredExperiences),
      getAbilityUserId(filterObj, "languages", filteredLanguages)
    ])

    let mainSkillsArr = responses[0]
    let mainExperiencesArr = responses[1]
    let mainLanguagesArr = responses[2]

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
      users.push(user)
    }
    return Promise.resolve(users)
  }

  export const getAbilityUserId = async (abilityObject: Object, abilityString: string, filteredArray: Array<any>): Promise<any> => {
    let mongoEntity = abilityString == "experiences" ? "name" : "title"
    let mainAbilityArr = []
    if(abilityObject[abilityString] != "" && filteredArray.length > 0){
      filteredArray.map(ability => {
        if(ability[mongoEntity].length == abilityObject[abilityString].split(",").length){
          mainAbilityArr.push(ability["_id"].toString())
        }
      })
    }

    return mainAbilityArr;
  }