import express from 'express';
import { getExperiences } from '../../models/experiences';

export const _get = async (req,res) => {
    let data = await getExperiences()
    if(data){res.send(data)} else {console.log("data yok")}
 }

 