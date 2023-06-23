import express from 'express';
import { createExperience, filterExperiences, getCompanyExperienceCount, getCompanyUsers, getUserExperiences } from '../../models/experiences';
import { ObjectId } from 'mongodb';
import { createCompany, getCompanyIdWithName } from '../../models/companies';
import { informFollowerMembersAboutMemberUpdateByEmail } from '../../models/members';

export const _filter = async (req,res) => {
    let dummy_user = req.body
    let data = await filterExperiences(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}
 }

 export const _createExperience = async(req,res) => {
    let company_id = await getCompanyIdWithName(req.body.experienceCompany);
    if(!company_id){
        let company = {
            name: req.body.experienceCompany,
            image: "",
            type: "Company",
            isBookmarked: false
        }
        let res = await createCompany(company);
        company_id = res.insertedId;
        console.log("inserted company id", company_id)
    } else {
        company_id = company_id["_id"]
    }
    let experience = {
        "user_id": new ObjectId(req.body.memberUserId),
        "name": req.body.experienceName,
        "company_id": company_id,
        "establishment": req.body.experienceCompany,
        "range": req.body.experienceDate,
        "location": req.body.experienceLocation,
        "external": true
    }

    if(req.body.isExperienceConformable){
        await informFollowerMembersAboutMemberUpdateByEmail(new ObjectId(req.body.memberId),req.body.memberFullname, experience)
    }
    
    let data = await createExperience(experience)
    if(data){
        res.send({
            "status": "ok",
            "msg": "Experience Başarıyla eklendi"
        })
    } else {
        res.send({
            "status": "error",
            "msg": "Experience Eklenemedi"
        })
        console.log("data yok")
    }
}
 export const _getUserExperiences = async(req,res) => {
    let data = await getUserExperiences(new ObjectId(req.body.user_id))
    if(data){res.send(data)} else {console.log("data yok")}
}

export const _getCompanyUsers = async(req,res) => {
    let data = await getCompanyUsers(new ObjectId(req.body.company_id))
    if(data){res.send(data)} else {console.log("data yok")}
}

export const _getCompanyExperienceCount = async(req,res) => {
    let data = await getCompanyExperienceCount(new ObjectId(req.body.companyId))
    if(data){res.send(data)} else {console.log("data yok")}
}