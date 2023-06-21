import { ObjectId } from "mongodb";
import { mongodbRead, mongodbWrite } from "../app";
import { getUserWithId } from "./users";
import { getCompanyWithId } from "./companies";
import { getMemberWithId } from "./members";
import { type } from "os";

export interface FAVOURITE {
  "_id"?: ObjectId;
  "user_id"?: ObjectId;
  "fav_id"?: ObjectId;
  "fav_type"?: string; // user,company,member
}

const collectionRead = mongodbRead.collection("m_favourites");
const collectionWrite = mongodbWrite.collection("m_favourites");

export const getUserFavs = async (userId: ObjectId, fav_type: string): Promise<any> => {
  return collectionRead.find({"user_id": userId, "fav_type": fav_type}).toArray()
}

export const getUserAsFav = async (favId: ObjectId): Promise<any> => { // emin deilim burdan
    return collectionRead.find({"fav_id": favId}).toArray()
}

const createFav = async (favourite: FAVOURITE): Promise<any> => {
  return collectionWrite.insertOne(favourite);
};

const deleteFav = async (favourite: FAVOURITE): Promise<any> => {
  return collectionWrite.deleteOne({
    "user_id": favourite.user_id,
    "fav_id": favourite.fav_id,
    "fav_type": favourite.fav_type
  });
};

export const updateFav = async (favourite: FAVOURITE): Promise<any> => {
  let _checkFav = await checkFav(favourite);
  if (!_checkFav) {
    await createFav(favourite);
    return "data created"
  } else {
    await deleteFav(favourite);
    return "data deleted"
  }
};

const checkFav = async (favourite: FAVOURITE): Promise<any> => {
  return collectionRead.findOne(
    {
      "user_id": favourite.user_id,
      "fav_id": favourite.fav_id,
      "fav_type": favourite.fav_type
    },
    {
      "projection": {
        "_id": 1,
      },
    }
  );
};

export const isAnyMemberFavedUser = async (fav_id: ObjectId): Promise<any> => {
  return collectionRead.findOne(
    {
      "fav_id": fav_id
    }
  );
};


export const getMemberFavAsUserIds = async (user_id: ObjectId, fav_type): Promise<any> => {
  return collectionRead.aggregate(
    [
      {
        '$match': {
          'user_id': user_id,
          'fav_type': fav_type
        }
      }, {
        '$group': {
          '_id': '$user_id', 
          'favs': {
            '$push': '$fav_id'
          }
        }
      }
    ]
  ).toArray();
};

export const getFollowerMembers = async (fav_id: ObjectId, fav_type: string): Promise<any> => {
  return collectionRead.aggregate(
    [
      {
        '$match': {
          'fav_id': fav_id,
          'fav_type': fav_type
        }
      }, {
        '$group': {
          '_id': '$fav_id', 
          'followers': {
            '$push': '$user_id'
          }
        }
      }
    ]
  ).toArray();
};

export const getBookmarkedUsers = async (user_id: ObjectId, fav_type): Promise<any> => {
  let idArray = []
  let data = (await getMemberFavAsUserIds(user_id,fav_type))[0];
  if(data){
    for(let i = 0;i < data.favs.length;i++){
      let id;
      if(fav_type == "member"){
        id = await getMemberWithId(data.favs[i])
      } else if(fav_type == "company"){
        id = await getCompanyWithId(data.favs[i])
      } else {
        id = await getUserWithId(data.favs[i])
      }
      idArray.push(id);
    }
  }
  return Promise.resolve(idArray)
};

export const memberFollowers = async (fav_id: ObjectId, fav_type: string):Promise<any> => {
  let _followers = []
  let data = (await getFollowerMembers(fav_id,fav_type))[0];
  if(data){
    for(let i = 0;i < data.followers.length;i++){
      let follower = await getMemberWithId(data.followers[i])
      _followers.push(follower);
    }
  }
  return Promise.resolve(_followers)
}

