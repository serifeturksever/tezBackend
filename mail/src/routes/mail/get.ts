import express from 'express';


// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
export const _get = async (req,res) => {
    console.log("mail get in get.ts")
    res.send({"status": "ok"})
 }