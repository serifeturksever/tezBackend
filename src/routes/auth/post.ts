import express from "express";
//import { requestChecker } from '../../app';
import { Crypt } from "../../services/guard";
import { signup, getHashedPasswordByEmail } from "../../models/auth";
var randomNumber = require("random-number-csprng");


export const _signup = async (req: express.Request, res: express.Response) => {
  console.log("req.body", req.body);
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

  if (repassword != password) {
    res.send({
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
  console.log("register", register);
  if (register.status == "ok") {
    res.send({
      status: "ok",
      msg: "",
      //"token": guardData.token
    });
  } else {
    res.send({
      status: "error",
      //"msg": saveCompany.msg
    });
  }
};

export const _login = async (req: express.Request, res: express.Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const data = await getHashedPasswordByEmail(email);

  if (data) {
    const crypt = new Crypt();
    const comparePassword = await crypt.compareHashes(password, data.password);
    if (comparePassword) {
      try {
        // res.locals.guard = guardData;
        res.send({
          status: "ok",
          msg: "",
        });
      } catch (ex) {
        res.send({
          status: "error",
          msg: "Invalid login info",
          resStatus: 400,
        });
      }
    } else {
      res.send({
        status: "error",
        msg: "Invalid login info 2",
        resStatus: 400,
      });
    }
  } else {
    res.send({
      status: "error",
      msg: "Invalid login info",
      resStatus: 400,
    });
  }
};

// export const _forgotPassword = async (req: express.Request, res: express.Response) => {
  
//     const preparedFunction = async (rows) => {
  
//       return new Promise(async (resolve, reject) => {
//         const crypt = new Crypt();
//         const randomPassword: string = (await (randomNumber(100000, 999999))).toString();
//         const password = await crypt.hash(randomPassword);
  
//         const update = await forgotPassword(req.body.email, password);
//         if (update['status'] === 'ok') {
//           Mailer.send({
//             to: `${update["msg"]} <${req.body.email}>`, // to: `${update["msg"]} <${req.body.email}>`,
//             subject: "New Password",
//             template: "forgotPassword",
//             text: `Your user name is ${update["msg"]} and password is ${randomPassword}. Please change your pssword after your first login.`,
//             data: {
//               user: update["msg"],
//               newPassword: randomPassword
//             }
//           }).then();
//           log.resStatus = 200;
//           resolve({
//             "status": "ok",
//             "data": "",
//             "msg": "If e-mail exists, new password will be sent."
//           });
//         }
//         else {
//           log.resStatus = 200;
//           resolve({
//             "status": "ok",
//             "data": "",
//             "msg": "If e-mail exists, new password will be sent."
//           });
//         }
//       })
//     }
  
//   }

// https://stackoverflow.com/questions/71270087/res-status-send-not-working-correctly-in-promise-all
