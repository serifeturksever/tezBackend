"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = exports.mongodbWrite = exports.mongodbRead = exports.VARIABLES = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
exports.VARIABLES = process.env;
if (process.env.NODE_ENV != "production") {
    dotenv_1.default.config();
}
const mongodb_1 = require("mongodb");
const mongoClient = new mongodb_1.MongoClient("mongodb+srv://serifeturksever:lm3vvXWJLBfrYhmh@cluster0.pgszwa5.mongodb.net/test");
exports.mongodbRead = mongoClient.db("bitirmetezi");
exports.mongodbWrite = mongoClient.db("bitirmetezi");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
//import { _get } from './routes/user/get';
const routes_1 = require("./routes/user/routes");
const routes_2 = require("./routes/favourite/routes");
const routes_3 = require("./routes/auth/routes");
exports.app = (0, express_1.default)();
const http = require("http");
exports.server = http.createServer(exports.app); // FIXME: Is this neccessary ?
// Configure express
exports.app
    .use(body_parser_1.default.json())
    .use(body_parser_1.default.urlencoded({ extended: true }))
    .use((0, cors_1.default)())
    .use('/user', routes_1.router)
    .use('/favourite', routes_2.router)
    .use('/auth', routes_3.router);
exports.app.get('/', (req, res) => {
    res.send('hii');
});
// Start the server
exports.server.listen(3001, () => {
    console.log('Server started on port 3001');
});
//# sourceMappingURL=app.js.map