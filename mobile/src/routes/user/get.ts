import express from 'express';
import { getUsers } from '../../models/users';

export const _get = async (req,res) => {
    let data = await getUsers()
    if(data){res.send(data)} else {console.log("data yok")}
 }

