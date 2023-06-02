import express from "express";
// import { requestChecker } from '../../app';
import { Crypt } from "../../services/guard";
import { signup, checkEmail, forgotPassword, getHashedPassword, updatePassword } from "../../models/auth";
import { Mailer } from "../../services/mail";
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
      msg: "success",
      //"token": guardData.token
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
        // res.locals.guard = guardData;
        res.send({
          status: "ok",
          msg: "success",
        });
      } catch (ex) {
        res.send({
          status: "error",
          msg: "Invalid login info",
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

// const Login = async (res: express.Response, data: Object): Promise<IGuard> => {
//   const payload = {
//     "userId": data["userId"],
//     "userLanguage": data["userLanguage"],
//     "userRole": data["userRole"],
//     "userName": data["userName"],
//     "companyId": data["companyId"],
//     // "companyName": data["_companyName"],
//     // "companyLogo": data["_companyLogo"]
//   };

//   res.locals.guard.payload = payload;
//   let guardData = res.locals.guard;

//   const values: [any, any] = await Promise.all([
//     requestChecker.saveTokenToMemoryWithPayload(guardData, res),
//     requestChecker.saveCompanyToMemory(new ObjectId(data["companyId"]))
//   ]);
//   return values[0];
// }


export const _forgotPassword = async (
  req: express.Request,
  res: express.Response
) => {
  return new Promise(async (resolve, reject) => {
    const crypt = new Crypt();
    const randomPassword: string = (
      await randomNumber(100000, 999999)
    ).toString();
    const password = await crypt.hash(randomPassword);

    const update = await forgotPassword(req.body.email, password);
    if (update["status"] === "ok") {
      Mailer.send({
        to: `${update["msg"]} <${req.body.email}>`, // to: `${update["msg"]} <${req.body.email}>`,
        subject: "New Password",
        template: "forgotPassword",
        text: `Your user name is ${update["msg"]} and password is ${randomPassword}. Please change your pssword after your first login.`,
        data: {
          user: update["msg"],
          newPassword: randomPassword,
        },
      }).then();
      //log.resStatus = 200;
      resolve({
        status: "ok",
        data: "",
        msg: "If e-mail exists, new password will be sent.",
      });
    } else {
      //log.resStatus = 200;
      resolve({
        status: "ok",
        data: "",
        msg: "If e-mail exists, new password will be sent.",
      });
    }
  });
};

export const _updatePassword = async (
  req: express.Request,
  res: express.Response
) => {
  const crypt = new Crypt();

  let [password, newPassword, newPasswordAgain] = [
    req.body.password,
    req.body.newPassword,
    req.body.newPasswordAgain,
  ];


    if (newPassword != newPasswordAgain) {
      res.send({
        status: "error",
        msg: "New Password and Confirm New Password is not equal.",
        resStatus: 400,
      });
    } else {
      const oldHashedPassword = await getHashedPassword(
        res.locals.guard.payload.userId);
      const comparePassword = await crypt.compareHashes(
        password,
        oldHashedPassword
      );
      if (!comparePassword) {
        res.send({
          status: "error",
          msg: "Invalid old password",
          resStatus: 400,
        });
      } else {
        const hashedPassword = await crypt.hash(newPassword);
        const row: any = await updatePassword(
          res.locals.guard.payload.userId,
          hashedPassword
        );
        if (row["status"] == "ok") {
          //log.resStatus = 200;

          res.send({
            status: "ok",
            msg: "Password change is successful.",
            data: " ",
          });
        } else {
          res.send({
            status: "error",
            msg: row["msg"],
            resStatus: 400,
          });
        }
      }
    }

};
// https://stackoverflow.com/questions/71270087/res-status-send-not-working-correctly-in-promise-all
