import express from 'express';
import { filterExperiences, getCompanyUsers, getUserExperiences } from '../../models/experiences';
import { ObjectId } from 'mongodb';

// What types of POST should be included ?

export const _filter = async (req,res) => {
    let dummy_user = req.body
    let data = await filterExperiences(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }

 export const _getUserExperiences = async(req,res) => {
    let data = await getUserExperiences(new ObjectId(req.body.user_id))
    if(data){res.send(data)} else {console.log("data yok")}
}

export const _getCompanyUsers = async(req,res) => {
    let data = await getCompanyUsers(new ObjectId(req.body.company_id))
    if(data){res.send(data)} else {console.log("data yok")}
}
