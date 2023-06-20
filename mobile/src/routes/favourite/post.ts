import express from 'express';
import { getBookmarkedUsers, getMemberFavAsUserIds, memberFollowers, updateFav } from '../../models/favourites';
import { ObjectId } from 'mongodb';


export const _updateFav = async (req,res) => {
    let fav = {
        "user_id": new ObjectId(req.body.user_id),
        "fav_id": new ObjectId(req.body.fav_id),
        "fav_type": req.body.fav_type
    }
    let data = await updateFav(fav)
    if(data){res.send(data)} else {console.log("data yok")}
 }

 
 export const _getMemberFavAsUserIds = async (req,res) => {
    let obj = {
        "user_id": new ObjectId(req.body.user_id),
        "fav_type": req.body.fav_type
    }
    let data = await getMemberFavAsUserIds(obj.user_id, obj.fav_type);
    if(data){
        if(data[0]){
            res.send(data[0].favs)
        }
    } else {
        console.log("data yok")
    }
 }

 export const _getBookmarkedUsers = async (req,res) => {
    let obj = {
        "user_id": new ObjectId(req.body.user_id),
        "fav_type": req.body.fav_type
    }
    let data = await getBookmarkedUsers(obj.user_id, obj.fav_type);
    if(data){res.send(data)} else {console.log("data yok")}
 }
 
 export const _memberFollowers = async (req,res) => {
    let obj = {
        "fav_id": new ObjectId(req.body.fav_id),
        "fav_type": req.body.fav_type
    }
    let data = await memberFollowers(obj.fav_id, obj.fav_type);
    if(data){res.send(data)} else {console.log("data yok")}
 }
 
