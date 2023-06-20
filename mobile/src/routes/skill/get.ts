import express from 'express';
import { getSkills } from '../../models/skills';

export const _get = async (req,res) => {
    let data = await getSkills()
    if(data){res.send(data)} else {console.log("data yok")}
 }

 