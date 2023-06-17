import express from 'express';

import { ServicesRequest } from '../../services/microServices';
import { ObjectId } from 'mongodb';
// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
export const _get = async (req,res) => {
    console.log("mail get in get.ts")
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
    console.log("a",data)
    // await fetch('10.22.168.184:3001/user')
    // .then((response) => response.json())
    // .then((body) => {
    //     console.log(body);
    // }); 

    res.send({"status": data})
 }