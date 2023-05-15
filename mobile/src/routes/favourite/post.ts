// Tamamlanacak

import express from 'express';
import { updateFav } from '../../models/favourites';
import { ObjectId } from 'mongodb';


export const _updateFav = async (req,res) => {
    let fav = {
        "user_id": new ObjectId(req.body.userId),
        "fav_id": new ObjectId(req.body.favId),
    }
    let data = await updateFav(fav)
    if(data){res.send(data)} else {console.log("data yok")}
 }


