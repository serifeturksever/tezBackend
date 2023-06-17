import express from 'express';


// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
export const _get = async (req,res) => {
    console.log("mail get in get.ts")

    // await fetch('10.22.168.184:3001/user')
    // .then((response) => response.json())
    // .then((body) => {
    //     console.log(body);
    // }); 

    res.send({"status": "ok"})
 }