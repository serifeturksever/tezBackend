import express from 'express';
import { filterUsers, getCompanyUsersAsUserObj, getFilteredUsers, getUsersWithUserIds } from '../../models/users';
import { ObjectId } from 'mongodb';

export const _filter = async (req,res) => {
    let dummy_user = req.body
    let data = await filterUsers(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }

 export const _getCompanyUsersAsUserObj = async (req,res) => {
    let data = await getCompanyUsersAsUserObj(new ObjectId(req.body.company_id))
    if(data){res.send(data)} else {console.log("data yok")}
 }

 export const _getFilteredUsers = async (req,res) => {
   const data = await getFilteredUsers(req.body);
   if(data){res.send(data)} else {console.log("data yok")}
}

export const _getUsersWithUserIds = async (req,res) => {
   let _userIdArr = req.body.userIdArr
   const data = await getUsersWithUserIds(_userIdArr);
   if(data){res.send(data)} else {console.log("data yok")}
}