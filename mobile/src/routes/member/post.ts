import express from 'express';
// import { filterMembers, getCompanyMembersAsUserObj } from '../../models/members';
import { ObjectId } from 'mongodb';

// What types of POST should be included ?

// export const _filter = async (req,res) => {
//     console.log(req.body)
//     let dummy_user = req.body
//     let data = await filterMembers(dummy_user)
//     if(data){res.send(data)} else {console.log("data yok")}
//  }

//  export const _getCompanyMembersAsUserObj = async (req,res) => {
//     console.log(req.body.company_id)
//     let data = await getCompanyMembersAsUserObj(new ObjectId(req.body.company_id))
//     if(data){res.send(data)} else {console.log("data yok")}
//  }