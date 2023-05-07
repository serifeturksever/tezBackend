// controller.js
// Logic behind the functionalities
//const data = require("./data");
import express from 'express';
import { getUsers } from '../../models/users';


// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
export const _get = async (req,res) => {
    console.log("user içi")

    let dummy_user = {}

    let data = await getUsers(dummy_user)
    if(data){res.send(data)} else {console.log("data yok")}


    // return new Promise((resolve, reject) => {
    //     // let data = getUsers("Murat Osman ÜNALIR")
    //     // console.log("usergetici",JSON.stringify(data))
    //     // if (1) {
    //     //     // return the todo
    //     //     let obj={name:"burhan"}
    //     //     resolve(obj);
    //     // } else {
    //     //     // return an error
    //     //     reject(`error`);
    //     // }
    //     try {
    //         resolve("merhaba ben user")    
    //     } catch (error) {
    //         console.log("ERROR! -> ", error)
    //     }
        
    // })
 }