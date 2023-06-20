import express from 'express';
import { getCourses } from '../../models/courses';


export const _get = async (req,res) => {
    let data = await getCourses()
    if(data){res.send(data)} else {console.log("data yok")}
 }

 