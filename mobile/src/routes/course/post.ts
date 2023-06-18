import express from 'express';
import { filterCourses, getUserCourses } from '../../models/courses';
import { ObjectId } from 'mongodb';

// What types of POST should be included ?

export const _filter = async (req,res) => {
    let dummy_user = req.body
    let data = await filterCourses(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }

 export const _getUserCourses = async(req,res) => {
    let data = await getUserCourses(new ObjectId(req.body.user_id))
    if(data){res.send(data)} else {console.log("data yok")}
}