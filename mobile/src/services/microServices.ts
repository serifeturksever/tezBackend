import bent from 'bent'
import { VARIABLES } from '../app';
import express from 'express';

type hostType = "MAILER" | "MOBILE";
type service = "MAILER" | "MOBILE" ;
type methodType = "GET" | "POST";

interface ISERVICEHEADER{
  [index: string]: string;
  "requestFromInside": "ms";
  "ms": service;
}

export const ServicesRequest = async (
  req: express.Request | null,
  res: express.Response | null,
  host: hostType,
  path: string,
  type: methodType = 'GET',
  body: Object = {},
  headers: ISERVICEHEADER
): Promise<any> => {
  return new Promise(async (resolve, reject) => {

    let guard = res ? res.locals.guard : null;
    let _host = VARIABLES[`${host}_HOST`];

    if ((_host[_host.length - 1] != '/')) {
      _host += '/'
    }
    if (path[0] == '/') {
      path = path.slice(1)
    }
    try {
      body = { _guard: guard, ...body }
      let _bent =  bent(_host, type, path.startsWith("static") ? 'buffer' : 'json')
      let request = await _bent(path, body, headers)
      resolve(request)
    } catch (error) {
      console.log(`host: ${_host} | path: ${path} | body: ${JSON.stringify(body)}`);
      reject(JSON.stringify({ error }))
    }
  })
}