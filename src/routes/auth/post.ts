import express from "express";
//import { requestChecker } from '../../app';
import { Crypt } from "../../services/guard";
import { signup } from "../../models/auth";
// import { getHashedPassword, updatePassword } from '../../models/users';

var randomNumber = require("random-number-csprng");

export const _signup = async (req: express.Request, res: express.Response) => {
  const crypt = new Crypt();
  let [name, surname, username, email, password, repassword] = [
    req.body.name,
    req.body.surname,
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.repassword,
  ];

  const hashedPassword = await crypt.hash(password);

  const p=  new Promise(async (resolve, reject) => {
    if (repassword != password) {
      reject({
        status: "error",
        msg: "Password check failed!",
      });
      return;
    }

    

    const register = await signup({
      name,
      surname,
      username,
      hashedPassword,
      email,
    });

    if (register.status == "ok") {
      resolve({
        status: "ok",
        msg: "",
        //"token": guardData.token
      });
    } else {
      reject({
        status: "error",
        //"msg": saveCompany.msg
      });
    }
  });
  p.then(data => {
    // 👇️ .then block ran:  Success message
    console.log('.then block ran: ', data);
  }).catch(err => {
    console.log('.catch block ran: ', err);
  });
};
