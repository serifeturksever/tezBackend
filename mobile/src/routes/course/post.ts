import express from 'express';
import { filterCourses } from '../../models/courses';

// What types of POST should be included ?

export const _filter = async (req,res) => {
    console.log(req.body)
    let dummy_user = req.body
    let data = await filterCourses(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }