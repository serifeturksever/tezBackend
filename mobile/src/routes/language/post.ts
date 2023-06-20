import express from 'express';
import { filterLanguages, getUserLanguages } from '../../models/languages';
import { ObjectId } from 'mongodb';

export const _filter = async (req,res) => {
    let dummy_user = req.body
    let data = await filterLanguages(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }

 export const _getUserLanguages = async(req,res) => {
    let data = await getUserLanguages(new ObjectId(req.body.user_id))
    if(data){res.send(data)} else {console.log("data yok")}
}