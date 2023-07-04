import express from 'express';
import { getMembers } from '../../models/members';

export const _get = async (req,res) => {
    let data = await getMembers()
    if(data){res.send(data)} else {console.log("data yok")}
 }

