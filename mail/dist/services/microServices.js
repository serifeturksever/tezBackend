"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesRequest = void 0;
const bent_1 = __importDefault(require("bent"));
const app_1 = require("../app");
const ServicesRequest = (req, res, host, path, type = 'GET', body = {}, headers) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let guard = res ? res.locals.guard : null;
        //const log = new LogData(req, guard, path, "service");
        let _host = app_1.VARIABLES[`${host}_HOST`];
        if ((_host[_host.length - 1] != '/')) {
            _host += '/';
        }
        if (path[0] == '/') {
            path = path.slice(1);
        }
        //log.server = _host;
        try {
            body = Object.assign({ _guard: guard }, body);
            let _bent = (0, bent_1.default)(_host, type, path.startsWith("static") ? 'buffer' : 'json');
            let request = yield _bent(path, body, headers);
            resolve(request);
        }
        catch (error) {
            console.log(`host: ${_host} | path: ${path} | body: ${JSON.stringify(body)}`);
            // log.level = "warning"
            // log.description = JSON.stringify({ error });
            // log.resStatus = 400;
            reject(JSON.stringify({ error }));
        } //finally {
        //log.saveLog()
        //}
    }));
});
exports.ServicesRequest = ServicesRequest;
// export const CatalogService = {
//   get: async (req: express.Request, res: express.Response, path: string, body: Object = {}, headers: Object = {}) => {
//     return new Promise(async (resolve, reject) => {
//       ServicesRequest(req, res, <string>VARIABLES.CATALOG_HOST, path, 'GET', body, headers).then(value => {
//         resolve(value)
//       }).catch(err => {
//         reject(err)
//       })
//     })
//   },
//   post: async (req: express.Request, res: express.Response, path: string, body: Object = {}, headers: Object = {}) => {
//     return new Promise(async (resolve, reject) => {
//       ServicesRequest(req, res, <string>VARIABLES.CATALOG_HOST, path, 'POST', body, headers).then(value => {
//         resolve(value)
//       }).catch(err => {
//         reject(err)
//       })
//     })
//   }
// }
//# sourceMappingURL=microServices.js.map