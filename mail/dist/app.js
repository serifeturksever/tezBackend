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
const mongoClient = new mongodb_1.MongoClient("mongodb+srv://serifeturksever:5TuhBQ0KmdHfQ6cx@cluster0.9ioa5np.mongodb.net/");
exports.mongodbRead = mongoClient.db("bitirmeteziMail");
exports.mongodbWrite = mongoClient.db("bitirmeteziMail");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes/mail/routes");
const port = 3002;
exports.app = (0, express_1.default)();
const http = require("http");
exports.server = http.createServer(exports.app);
exports.app
    .use(body_parser_1.default.json())
    .use(body_parser_1.default.urlencoded({ extended: true }))
    .use((0, cors_1.default)())
    .use('/mail', routes_1.router);
exports.app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.server.listen(port, () => {
    console.log(`Mail server started on port ${port}`);
});
//# sourceMappingURL=app.js.map