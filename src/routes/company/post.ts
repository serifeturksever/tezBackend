import express from 'express';
import { filterCompanies } from '../../models/companies';

// What types of POST should be included ?

export const _filter = async (req,res) => {
    console.log(req.body)
    let dummy_user = req.body
    let data = await filterCompanies(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }