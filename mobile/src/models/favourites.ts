import { ObjectId } from "mongodb";
import { mongodbRead, mongodbWrite } from "../app";
import { getUserWithId, updateUserBookmark } from "./users";
import { getCompanyWithId, updateCompanyBookmark } from "./companies";
import { getMemberWithId } from "./members";

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

export const updateBookmark = async (favourite: FAVOURITE ,actionType: String): Promise<any> => {
  let isStillBookmarked;
  if(actionType == "add"){ isStillBookmarked = true }else if(actionType == "delete"){ isStillBookmarked = false };
      if(favourite.fav_type == "user"){
        let user = await getUserWithId(favourite.fav_id);
        user.isBookmarked = isStillBookmarked
        await updateUserBookmark(user);
    } else if(favourite.fav_type == "company") {
        let company = await getCompanyWithId(favourite.fav_id);
        company.isBookmarked = isStillBookmarked
        await updateUserBookmark(company);
    } else if(favourite.fav_type == "member"){
        let member = await getMemberWithId(favourite.fav_id);
        member.isBookmarked = isStillBookmarked
        await updateUserBookmark(member);
    }
}

export const updateFav = async (favourite: FAVOURITE): Promise<any> => {
  let _checkFav = await checkFav(favourite);
  console.log(_checkFav)
  if (!_checkFav) {
    await createFav(favourite);
    await updateBookmark(favourite, "add");
    return "data created"
  } else {
    await deleteFav(favourite);
    let _stillFaved = await isAnyMemberFavedUser(favourite.fav_id);
    console.log(_stillFaved)
    if(!_stillFaved){
      await updateBookmark(favourite,"delete");
    }
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