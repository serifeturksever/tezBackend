import express from 'express';
import { filterEducations, getUserEducations } from '../../models/educations';
import { ObjectId } from 'mongodb';

// What types of POST should be included ?

export const _filter = async (req,res) => {
    let dummy_user = req.body
    let data = await filterEducations(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }

 export const _getUserEducations = async(req,res) => {
    let data = await getUserEducations(new ObjectId(req.body.user_id))
    if(data){res.send(data)} else {console.log("data yok")}
}

 