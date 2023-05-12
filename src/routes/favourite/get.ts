
import express from 'express';
import { getUserAsFav,getUserFavs } from '../../models/favourites';
import { ObjectId } from 'mongodb';


export const _getUserFavs = async (req,res) => {
    let data = await getUserFavs(new ObjectId(req.body.userId))
    if(data){res.send(data)} else {console.log("data yok")}
 }

 export const _getUserAsFav = async (req,res) => {
    let data = await getUserAsFav(new ObjectId(req.body.favId))
    if(data){res.send(data)} else {console.log("data yok")}
 }

