"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
module.exports = function () {
    const db = process.env.DATABASE_URL;
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connect(db).then(() => { console.log(`Connected To Database`); }).catch(err => { console.log(`Failed to connect : ${err}`); });
};
