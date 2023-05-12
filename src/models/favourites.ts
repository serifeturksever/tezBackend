import { ObjectId } from "mongodb";
import { mongodbRead, mongodbWrite } from "../app";

export interface FAVOURITE {
  "_id"?: ObjectId;
  "user_id"?: ObjectId;
  "fav_id"?: ObjectId;
}

const collectionRead = mongodbRead.collection("favourites");
const collectionWrite = mongodbWrite.collection("favourites");

export const getUserFavs = async (userId: ObjectId): Promise<any> => {
  return collectionRead.find({"user_id": userId}).toArray()
}

export const getUserAsFav = async (favId: ObjectId): Promise<any> => {
    return collectionRead.find({"fav_id": favId}).toArray()
}

const createFav = async (favourite: FAVOURITE): Promise<any> => {
  return collectionWrite.insertOne(favourite);
};

const deleteFav = async (favourite: FAVOURITE): Promise<any> => {
  return collectionWrite.deleteOne({
    "user_id": favourite.user_id,
    "fav_id": favourite.fav_id,
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
    },
    {
      "projection": {
        "_id": 1,
      },
    }
  );
};
