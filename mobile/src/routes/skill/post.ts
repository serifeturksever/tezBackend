import express from 'express';
import { filterSkills, getUserSkills } from '../../models/skills';

// What types of POST should be included ?

export const _filter = async (req,res) => {
    console.log(req.body)
    let dummy_user = req.body
    let data = await filterSkills(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }

export const _getUserSkills = async(req,res) => {
    let data = await getUserSkills(req.body.user_id)
    if(data){res.send(data)} else {console.log("data yok")}

}