"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
// Configure body-parser
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
// Configure CORS
exports.app.use((0, cors_1.default)());
// Define a route
exports.app.get('/', (req, res) => {
    res.send('hi');
});
// Start the server
exports.app.listen(30001, () => {
    console.log('Server started on port 3001');
});
//# sourceMappingURL=app.js.map