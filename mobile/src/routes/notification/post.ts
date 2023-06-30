import express from 'express';
import { ObjectId } from 'mongodb';
import { NOTIFICATION, notifyFollowerMembersAboutUpdates } from '../../models/notifications';

export const _notifyFollowersByEmail = async(req,res) => {
    let notificationObj: NOTIFICATION = {
        "user_id": new ObjectId("" + req.body.user_id),
        "user_name": req.body.user_name,
        "experiences": req.body.experiences ?? [],
        "skills": req.body.skills ?? [],
        "courses": req.body.courses ?? [],
        "educations": req.body.educations ?? [],
        "languages": req.body.languages ?? []
    }
    let data = await notifyFollowerMembersAboutUpdates(notificationObj);
    if(data){res.send(data)} else {console.log("data yok")}
}