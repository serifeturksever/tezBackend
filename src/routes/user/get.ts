// controller.js
// Logic behind the functionalities
//const data = require("./data");
import express from 'express';
import { getUsers } from '../../models/users';


export const _get = async () => {

    return new Promise((resolve, reject) => {
        // let data = getUsers("Murat Osman ÜNALIR")
        // console.log("usergetici",JSON.stringify(data))
        if (1) {
            // return the todo
            let obj={name:"burhan"}
            resolve(obj);
        } else {
            // return an error
            reject(`error`);
        }
    })
 }