// // import { requestChecker } from '../app';
// import { IGuard } from './guard';
// import { v4 as uuidv4 } from 'uuid';


// export interface IDbRows {
//   status?: string;
//   msg?: string | string[];
//   [propName: string]: any;
// }

// interface ILogData {
//   server: string;
//   serverIp: string;
//   logName: string;
//   description: string;
//   fileName: string;
//   functionName: string;
//   reqIp: string;
//   reqHeaders: string;
//   reqBody: string;
//   reqFullUrl: string;
//   reqOriginalUrl: string;
//   reqMethod: string;
//   reqToken: string;
//   reqTokenPayload: string;
//   user: string;
//   reqIsFile: number;
//   reqFileInfo: string;
//   res: string;
//   resStatus: number;
//   resTime: number;
//   level: string;
//   identifier: string;
// }

// export default class LogData {

//   private _logData: ILogData;

//   constructor(req: Request | any, guard: IGuard | null, fileName: string, functionName: string) {
//     let uuid = uuidv4();
//     if(!req){
//       req = {};
//       req["headers"] = {}
//       req["protocol"] = "https"
//       req["originalUrl"] = ""
//       req["method"] = ""
//     }
//     if (req.hasOwnProperty("logUUID")) {
//       uuid = req.logUUID;
//     } else {
//       req["logUUID"] = uuid;
//     }

//     this._logData = {
//       server: "v3", // simdilik bos
//       serverIp: "", // simdilik bos
//       logName: "",
//       description: "",
//       fileName: fileName,
//       functionName: functionName,
//       reqIp: guard ? guard.ip : "before guard",
//       reqHeaders: req.hasOwnProperty("headers") ? JSON.stringify(req.headers).substring(0, 8000) : "",
//       reqBody: req.body ? JSON.stringify(this.clearSensitiveData(req.body)) : "",
//       reqFullUrl: (req.protocol && req.hasOwnProperty("get") && req.originalUrl) ?  req.protocol + '://' + req.get('host') + req.originalUrl : "",
//       reqOriginalUrl: req.originalUrl,
//       reqMethod: req.method ? req.method.substring(0, 10) : "",
//       reqToken: guard ? guard.token : "before guard",
//       reqTokenPayload: guard ? JSON.stringify(guard.payload).substring(0, 1000) : "before guard",
//       user: guard ? guard.payload.hasOwnProperty("u") ? guard.payload["u"].toString() : "" : "before guard",
//       reqIsFile: 0,
//       reqFileInfo: "",
//       res: "",
//       resStatus: 404,
//       // resTime: Math.floor((new Date().getTime()) * 1000),
//       resTime: new Date().getTime(),
//       level: "info",
//       identifier: uuid
//     }
//   }

//   set logName(logName: string) {
//     this._logData.logName = logName.substring(0, 500);
//   }

//   set server(server: string) {
//     this._logData.server = server.substring(0, 500);
//   }

//   set description(description: string) {
//     this._logData.description = description.substring(0, 5000);
//   }

//   set reqIsFile(reqIsFile: number) {
//     this._logData.reqIsFile = reqIsFile;
//   }

//   set reqFileInfo(reqFileInfo: string) {
//     this._logData.reqFileInfo = reqFileInfo.substring(0, 400);
//   }

//   set res(res: string) {
//     this._logData.res = res == null ? "" : typeof res == "string" ? res.substring(0, 4294967290) : JSON.stringify(res).substring(0, 4294967290);
//   }

//   set resStatus(resStatus: number) {
//     this._logData.resStatus = resStatus;
//   }

//   set level(level: string) {
//     this._logData.level = level.substring(0, 10);
//   }

//   get log(): ILogData {
//     return this._logData;
//   }

//   get identifier(): string {
//     return this._logData.identifier;
//   }

//   private clearSensitiveData(body: object): object {
//     const sensitiveObjects = [
//       "password", "confirmPassword", "oldPassword", "repassword", "newPassword", "newPasswordAgain",
//       "token", "ccToken", "cvc", "ccName", "ccNumber", "ccExpMonth", "ccExpYear", "ccCvc"
//     ]
//     let clearedBody: Object = Object.assign({}, body);
//     Object.keys(clearedBody).forEach(k => {
//       sensitiveObjects.forEach(s => {
//         if (k == s) {
//           clearedBody[k] = "";
//         }
//       })
//     })
//     return clearedBody;
//   }

//   public saveLog(): Promise<object> {

//     return new Promise(async (resolve, reject) => {

//       let time = new Date().getTime();

//       this._logData.resTime = time - this._logData.resTime;

//       Redis.memory.set('log.' + this._logData.identifier + '-' + (Date.now()), JSON.stringify(this._logData));

//       resolve({
//         "status": "ok"
//       });
//     })
//   }

// }