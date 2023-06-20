import express from 'express';
import { filterCompanies } from '../../models/companies';

export const _filter = async (req,res) => {
    let dummy_user = req.body
    let data = await filterCompanies(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }