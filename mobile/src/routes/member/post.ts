import express from 'express';
import { ObjectId } from 'mongodb';
import { connectAccountWithLinkedIn } from '../../models/members';

export const _connectAccountWithLinkedIn = async (req,res) => {
    let [memberId, profileLink] = [req.body.memberId, req.body.profileLink]
    let data = await connectAccountWithLinkedIn(new ObjectId(memberId), profileLink);
    if(data){res.send(data)} else {console.log("data yok")} // success veya error dönecek burdan
 }