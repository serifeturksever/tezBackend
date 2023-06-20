import express from 'express';
import { getEducations } from '../../models/educations';

export const _get = async (req,res) => {
    let data = await getEducations()
    if(data){res.send(data)} else {console.log("data yok")}
 }

 