// controller.js
// Logic behind the functionalities
//const data = require("./data");
import express from 'express';
import { getLanguages } from '../../models/languages';


// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
export const _get = async (req,res) => {
    let data = await getLanguages()
    if(data){res.send(data)} else {console.log("data yok")}
 }

 