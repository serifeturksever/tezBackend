// import bent from 'bent'
// import { VARIABLES } from '../app';
// //import LogData from './log';
// import express from 'express';
// type hostType = "MAILER" | "WEB";
// type service = "MAILER" | "WEB" ;
// type methodType = "GET" | "POST";
// interface ISERVICEHEADER{
//   [index: string]: string;
//   "requestFromInside": "ms";
//   "ms": service;
// }
// export const ServicesRequest = async (
//   req: express.Request | null,
//   res: express.Response | null,
//   host: hostType,
//   path: string,
//   type: methodType = 'GET',
//   body: Object = {},
//   headers: ISERVICEHEADER
// ): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     let guard = res ? res.locals.guard : null;
//     //const log = new LogData(req, guard, path, "service");
//     let _host = VARIABLES[`${host}_HOST`];
//     if ((_host[_host.length - 1] != '/')) {
//       _host += '/'
//     }
//     if (path[0] == '/') {
//       path = path.slice(1)
//     }
//     //log.server = _host;
//     try {
//       body = { _guard: guard, ...body }
//       let _bent =  bent(_host, type, path.startsWith("static") ? 'buffer' : 'json')
//       let request = await _bent(path, body, headers)
//       resolve(request)
//     } catch (error) {
//       console.log(`host: ${_host} | path: ${path} | body: ${JSON.stringify(body)}`);
//       // log.level = "warning"
//       // log.description = JSON.stringify({ error });
//       // log.resStatus = 400;
//       reject(JSON.stringify({ error }))
//     } //finally {
//       //log.saveLog()
//     //}
//   })
// }
// // export const CatalogService = {
// //   get: async (req: express.Request, res: express.Response, path: string, body: Object = {}, headers: Object = {}) => {
// //     return new Promise(async (resolve, reject) => {
// //       ServicesRequest(req, res, <string>VARIABLES.CATALOG_HOST, path, 'GET', body, headers).then(value => {
// //         resolve(value)
// //       }).catch(err => {
// //         reject(err)
// //       })
// //     })
// //   },
// //   post: async (req: express.Request, res: express.Response, path: string, body: Object = {}, headers: Object = {}) => {
// //     return new Promise(async (resolve, reject) => {
// //       ServicesRequest(req, res, <string>VARIABLES.CATALOG_HOST, path, 'POST', body, headers).then(value => {
// //         resolve(value)
// //       }).catch(err => {
// //         reject(err)
// //       })
// //     })
// //   }
// // }
//# sourceMappingURL=microServices.js.map