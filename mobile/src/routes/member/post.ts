import express from 'express';
// import { filterMembers, getCompanyMembersAsUserObj } from '../../models/members';
import { ObjectId } from 'mongodb';
import { connectAccountWithLinkedIn } from '../../models/members';

// What types of POST should be included ?

export const _connectAccountWithLinkedIn = async (req,res) => {
    // bu metoda post atılma şartı ön yüzde mail ile linkedin mail aynı olmalı
    let [memberId, profileLink] = [req.body.memberId, req.body.profileLink]
    let data = await connectAccountWithLinkedIn(new ObjectId(memberId), profileLink);
    if(data){res.send(data)} else {console.log("data yok")} // success veya error dönecek burdan
 }