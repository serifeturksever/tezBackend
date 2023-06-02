import express from 'express';
import { filterUsers, getCompanyUsersAsUserObj } from '../../models/users';
import { ObjectId } from 'mongodb';

// What types of POST should be included ?

export const _filter = async (req,res) => {
    console.log(req.body)
    let dummy_user = req.body
    let data = await filterUsers(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }

 export const _getCompanyUsersAsUserObj = async (req,res) => {
    console.log(req.body.company_id)
    let data = await getCompanyUsersAsUserObj(new ObjectId(req.body.company_id))
    if(data){res.send(data)} else {console.log("data yok")}
 }