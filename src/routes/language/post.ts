import express from 'express';
import { filterLanguages } from '../../models/languages';

// What types of POST should be included ?

export const _filter = async (req,res) => {
    console.log(req.body)
    let dummy_user = req.body
    let data = await filterLanguages(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }