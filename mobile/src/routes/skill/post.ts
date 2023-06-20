import express from 'express';
import { filterSkills, getUserSkills } from '../../models/skills';
import { ObjectId } from 'mongodb';

export const _filter = async (req,res) => {
    let dummy_user = req.body
    let data = await filterSkills(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }

export const _getUserSkills = async(req,res) => {
    let data = await getUserSkills(new ObjectId(req.body.user_id))
    if(data){res.send(data)} else {console.log("data yok")}

}