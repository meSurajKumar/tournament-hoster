"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    teamName: { type: String },
    teamNameSmall: { type: String },
    role: { type: String },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    isPaymentDone: { type: Boolean, default: false },
    deviceToken: { String },
    otp: { type: String },
    isEmailVerified: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
