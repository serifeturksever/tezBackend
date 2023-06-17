import express from "express";
// import { requestChecker } from '../../app';
import { Crypt } from "../../services/guard";
import { signup, checkEmail, forgotPassword, getHashedPassword, updatePassword } from "../../models/auth";
import { Mailer } from "../../services/mail";
import { ObjectId } from "mongodb";
import { isUsernameExist, updateMemberWithMemberId } from "../../models/members";
var randomNumber = require("random-number-csprng");

export const _signup = async (req: express.Request, res: express.Response) => {
  console.log("req.body", req.body);
  const crypt = new Crypt();
  let [fullname, username, email, password, repassword] = [
    req.body.fullname,
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.repassword,
  ];

  const _isUsernameExist = await isUsernameExist(username);
  console.log(_isUsernameExist)
  if(_isUsernameExist._id){
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
  console.log(data)
  if (data) {
    const crypt = new Crypt();
    const comparePassword = await crypt.compareHashes(password, data.password);
    if (comparePassword) {  
      try {
        // res.locals.guard = guardData;
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
    const crypt = new Crypt();
    const randomPassword: string = (
      await randomNumber(100000, 999999)
    ).toString();
    console.log(randomPassword)
    const password = await crypt.hash(randomPassword);

    const update = await forgotPassword(req.body.email, password);
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

  console.log(userId,password,newPassword,newPasswordAgain)


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
        console.log("row",row)
        if (row["status"] == "ok") {
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

export const _updateUsername = async (
  req: express.Request,
  res: express.Response
) => {

  let [memberId, newMemberName] = [
    req.body.memberId,
    req.body.newMemberName
  ];

  let updateResponse = await updateMemberWithMemberId(new ObjectId(memberId), newMemberName)
  if(!updateResponse.modifiedCount){
    res.send({
      status: "error",
      msg: "User name couldn't be changed!"
    });
  } else {
    res.send({
      status: "ok",
      msg: "Username is changed successfully"
    });
  }
};

// https://stackoverflow.com/questions/71270087/res-status-send-not-working-correctly-in-promise-all
