import express from 'express';

import { ServicesRequest } from '../../services/microServices';
import { ObjectId } from 'mongodb';
import { getMails } from '../../models/mail';
// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz

export const _getAllMails = async (req,res) => {
    let mails = await getMails();
    if(mails){res.send({mails})} else {console.log("data yok")}
}

export const _get = async (req,res) => {
    let data= await ServicesRequest(
        null,
        null,
        "MOBILE",
        "user/",
        "GET",
        {
        },
        {
            "requestFromInside": "ms",
            "ms": "MAILER"
        }
    )
    // await fetch('10.22.168.184:3001/user')
    // .then((response) => response.json())
    // .then((body) => {
    //     console.log(body);
    // }); 

    res.send({"status": data})
 }