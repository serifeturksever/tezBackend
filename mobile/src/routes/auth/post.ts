import express from "express";
import { Crypt } from "../../services/guard";
import { signup, checkEmail, forgotPassword, getHashedPassword, updatePassword } from "../../models/auth";
import { ObjectId } from "mongodb";
import { isUsernameExist } from "../../models/members";
import { ServicesRequest } from "../../services/microServices";
var randomNumber = require("random-number-csprng");

export const _signup = async (req: express.Request, res: express.Response) => {
  const crypt = new Crypt();
  let [fullname, username, email, password, repassword] = [
    req.body.fullname,
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.repassword,
  ];

  const _isUsernameExist = await isUsernameExist(username);
  if(_isUsernameExist){
    res.send({
      status: "error",
      msg: "This username exists. Please choose another username!"
    })
    return;
  }

  const hashedPassword = await crypt.hash(password);

  if (repassword != password) {
    res.send({
      status: "error",
      msg: "Password check failed!",
    });
    return;
  }

  const register = await signup({
    fullname,
    username,
    hashedPassword,
    email,
  });
  if (register.status == "ok") {
    let data= await ServicesRequest(
      null, // -> Express.request
      null, // -> Express.response
      "MAILER", // -> İsteğin atıldığı servis MAILER: mail servisi
      "mail/register", // -> isteğin atıldığı path
      "POST", // HTTP request tipi
      {
        "email":req.body.email,
        "username": req.body.username // POST HTTP request parametreleri
      },
      {
          "requestFromInside": "ms", 
          "ms": "MOBILE" // isteği atan servis
      }
  )
    res.send({
      status: "ok",
      msg: "success",
    });
  } else {
    res.send({
      status: "error",
      "msg": "fail"
    });
  }
};

export const _login = async (req: express.Request, res: express.Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const data = await checkEmail(email);
  if (data) {
    const crypt = new Crypt();
    const comparePassword = await crypt.compareHashes(password, data.password);
    if (comparePassword) {  
      try {
        res.send({
          status: "ok",
          msg: "success",
          _id: data._id,
          fullname: data.fullname,
          username: data.username,
          userId: data.userId ? data.userId : ""
        });
      } catch (ex) {
        res.send({
          status: "error",
          msg: "Invalid login info",
          _id: "",
          fullname: "",
          userName: "",
          userId: ""
        });
      }
    } else {
      res.send({
        status: "error",
        msg: "Invalid login info 2",
      });
    }
  } else {
    res.send({
      status: "error",
      msg: "Invalid login info",
    });
  }
};

export const _forgotPassword = async (
  req: express.Request,
  res: express.Response
) => {
    const crypt = new Crypt();
    const randomPassword: string = (
      await randomNumber(100000, 999999)
    ).toString();
    const password = await crypt.hash(randomPassword);

    const update = await forgotPassword(req.body.email, password);

    if(update.status == "ok"){

      let data= await ServicesRequest(
        null,
        null,
        "MAILER",
        "mail/forgotPassword",
        "POST",
        {
          "email":req.body.email,
          "password": randomPassword
        },
        {
            "requestFromInside": "ms",
            "ms": "MOBILE"
        }
    )
      
    }
    res.send(update);

};

export const _updatePassword = async (
  req: express.Request,
  res: express.Response
) => {
  const crypt = new Crypt();

  let [userId, password, newPassword, newPasswordAgain] = [
    req.body.userId,
    req.body.password,
    req.body.newPassword,
    req.body.newPasswordAgain,
  ];

    if (newPassword != newPasswordAgain) {
      res.send({
        status: "error",
        msg: "New Password and Confirm New Password is not equal."
      });
    } else {
      const oldHashedPassword = await getHashedPassword(
        userId);
      const comparePassword = await crypt.compareHashes(
        password,
        oldHashedPassword
      );
      if (!comparePassword) {
        res.send({
          status: "error",
          msg: "Invalid old password"
        });
      } else {
        const hashedPassword = await crypt.hash(newPassword);
        const row: any = await updatePassword(
          userId,
          hashedPassword
        );
        if (row["status"] == "ok") {
          let data= await ServicesRequest(
            null,
            null,
            "MAILER",
            "mail/updatePassword",
            "POST",
            {
              "email":row.data.value.email
            },
            {
                "requestFromInside": "ms",
                "ms": "MOBILE"
            }
        )
          res.send({
            status: "ok",
            msg: "Password changed successfully!"
          });
        } else {
          res.send({
            status: "error",
            msg: "Password could not be changed",
          });
        }
      }
    }
};

// https://stackoverflow.com/questions/71270087/res-status-send-not-working-correctly-in-promise-all
