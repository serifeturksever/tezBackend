import express from 'express';
import { getLanguages } from '../../models/languages';

export const _get = async (req,res) => {
    let data = await getLanguages()
    if(data){res.send(data)} else {console.log("data yok")}
 }

 