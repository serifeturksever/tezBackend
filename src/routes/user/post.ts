import express from 'express';
import { filterUsers } from '../../models/users';


export const _filterUsers = async (req,res) => {
    console.log(req.body)
    let dummy_user = req.body
    let data = await filterUsers(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }