import express from 'express';


// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
export const _sendMail = async (req,res) => {
    console.log("send mail")
    res.send({"status": "ok"})
 }