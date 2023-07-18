"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require('dotenv').config();
const port = process.env.PORT;
require('./startup/middleware')(app);
require('./startup/db')();
require('./startup/router')(app);
app.listen(port, () => { console.log(`Listening to Port : ${port}`); });
