import { ObjectId } from 'mongodb';
import { mongodbRead, mongodbWrite } from '../app';
import { addMemberIdToUser, getUserIdWithProfileLink } from './users';
import { profile } from 'console';
// import { getCompanyUsers } from './experiences';

export interface MEMBER {
    "_id": ObjectId;
    "fullname": string;
    "username": string;
    "email": string;
    "userId"?: string;
    "password"?: string;
    "isBookmarked"?: Boolean; 
}

const collectionRead = mongodbRead.collection('members');
const collectionWrite = mongodbWrite.collection('members');


export const getMembers = async (): Promise<any> => {
  return collectionRead.find().toArray()
}

export const isUsernameExist = async (username: string): Promise<any> => {
  return collectionRead.findOne(
    {
      "username": username
    },
    {
      "projection": {
        "_id": 1
      }
    }
  )
}

export const getCompanyWithId = async (company_id: ObjectId): Promise<any> => {
  return collectionRead.findOne({"_id": company_id});
}

export const addUserIdToMember = async (userId: ObjectId, memberId: ObjectId): Promise<any> => {
  return collectionWrite.updateOne(
    {
      "_id": memberId
    },
    {
      "$set": {
        "userId": userId
      }
    }
    );
}

export const connectAccountWithLinkedIn = async (memberId: ObjectId, profileLink: string): Promise<any> => {
  let relatedUserId = await getUserIdWithProfileLink(profileLink);
  console.log("relatedUserId ===> ",relatedUserId)
  if(relatedUserId){
    // let _addMemberIdToUser = await addMemberIdToUser(memberId,profileLink);
    // let _addUserrIdToMember = await addUserIdToMember(relatedUserId,memberId);
    await Promise.all([
      addMemberIdToUser(memberId,profileLink),
      addUserIdToMember(relatedUserId["userId"],memberId)
    ])
    return Promise.resolve({"status": "ok", "msg": "success", "userId": relatedUserId["userId"]})
  } else {
    return Promise.resolve({"status": "error", "msg": "Problem occured", userId: ""})
  }
}

export const updateMemberBookmark = async (member: MEMBER): Promise<any> => {
  return collectionRead.updateOne(
    {
    "_id": member._id
    },
    {
      "$set": {
        "isBookmarked": member.isBookmarked
      }
    }
    );
}

export const getMemberIdWithEmail = async (memberEmail: string): Promise<any> => {
  return collectionRead.findOne(
    {
    "email": memberEmail
    },
    {
      "projection": {
        "memberId": "$_id"
      }
    }
    );
}

export const updateMemberWithMemberId = async (member_id: ObjectId, newUserName: string): Promise<any> => {
  return collectionWrite.updateOne({"_id": member_id},{"$set": {"username": newUserName}});
}

export const getMemberWithId = async (member_id: ObjectId): Promise<any> => {
  return collectionRead.findOne({"_id": member_id});
}

// export const filterUsers = async (params: MEMBER): Promise<any> => {
//     const {
//       full_name,
//       about,
//       location,
//       // connection_count -> ekle
//     } = params;
  
//     // let { dataCount } = params;
//     // let { startData } = params;
  
//     // if (!dataCount) {
//     //   dataCount = 1
//     // }
//     // else if (dataCount > 10000) {
//     //   dataCount = 10000;
//     // }
  
//     let filter = {};
  
//     if (full_name) {
//       filter["full_name"] = { $regex: new RegExp(`${full_name}`, "i") };
//     }
//     if (about) {
//       filter["about"] = { $regex: new RegExp(`${about}`, "i") };
//     }
//     if (location) {
//         filter["location"] = { $regex: new RegExp(`${location}`, "i") };
//       }
  
//    console.log("filter",filter)

//     let value = await collectionRead.aggregate([
//       {
//         $facet: {
//           "data": [
//             {
//               $match: filter
//             },
//             {
//               "$project": {
//                 "_id": 0,
//                 "id": "$_id",
//                 "full_name": 1,
//                 "image": 1,
//                 "about": 1,
//                 "connection_count": 1,
//                 "location": 1
//               }
//             },
//             // { $skip: startData ? startData : 0 },
//             // { $limit: dataCount }
//           ],
//         //   'count': [
//         //     {
//         //       '$match': filter
//         //     }, {
//         //       '$count': 'count'
//         //     }
//         //   ]
//         }
//       }
//     ]).toArray()
//    // console.log("value",JSON.stringify(value))
//    console.log("value", value[0].data)
    
//    // eğer bu filtreye uygun kullanıcı yoksa array boş geliyor
//     return Promise.resolve(value[0].data);
//   }

  

  // export const getUserWithId = async (user_id: ObjectId): Promise<any> => {
  //   return collectionRead.find({"_id": user_id}).toArray()
  // }

  // export const getCompanyUsersAsUserObj = async (company_id: ObjectId): Promise<any> => {
  //   let users = []
  //   let companyUsers = await getCompanyUsers(company_id);
  //   for(let i=0;i<companyUsers.length;i++) {
  //     let user = await getUserWithId(companyUsers[i]);
  //     if(user[0]){
  //       users.push(user[0])
  //     }
  //   }
  //   return Promise.resolve(users);
  // }