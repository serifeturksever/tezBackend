import express from 'express';
import { ObjectId } from 'mongodb';
import { createFollow } from '../../models/follows';


// export const _getUserFollowsAsIdArray = async(req,res) => {
//     let follow = {
//         "user_id": new ObjectId(req.body.userId),
//     }
//     let data = await createFollow(follow)
//     if(data){res.send(data)} else {console.log("data yok")}
// }

export const _createFollow = async(req,res) => {
    let follow = {
        "user_id": new ObjectId(req.body.userId),
        "followed_id": new ObjectId(req.body.followedId),
    }
    let data = await createFollow(follow)
    if(data){res.send(data)} else {console.log("data yok")}
}