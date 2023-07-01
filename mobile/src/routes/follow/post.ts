import express from 'express';
import { ObjectId } from 'mongodb';
import { getNotifiedUsers, getUserFollowingsAsIdArray, updateFollow } from '../../models/follows';


// export const _getUserFollowsAsIdArray = async(req,res) => {
//     let follow = {
//         "user_id": new ObjectId(req.body.userId),
//     }
//     let data = await createFollow(follow)
//     if(data){res.send(data)} else {console.log("data yok")}
// }

export const _updateFollow = async(req,res) => {
    let follow = {
        "member_id": new ObjectId(req.body.memberId),
        "followed_id": new ObjectId(req.body.followedId),
        "isAdded": req.body.isAdded
    }
    let data = await updateFollow(follow)
    if(data){res.send(data)} else {console.log("data yok")}
}

export const _getMemberNotifyUsers = async (req,res) => {
    let obj = {
        "member_id": new ObjectId(req.body.memberId),
    }
    let data = await getUserFollowingsAsIdArray(obj.member_id);
    if(data){
        if(data[0]){
            res.send(data[0].followeds)
        }
    } else {
        console.log("data yok")
    }
 }

 export const _getNotifiedUsers = async (req,res) => {
    let obj = {
        "member_id": new ObjectId(req.body.memberId),
    }
    let data = await getNotifiedUsers(obj.member_id);
    if(data){res.send(data)} else {console.log("data yok")}
 }