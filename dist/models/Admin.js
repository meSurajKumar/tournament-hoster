"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    countryCode: { type: String },
    profile: {
        name: { type: String },
        url: { type: String }
    },
    verified: { type: String },
    deviceToken: { String },
    otp: { type: String },
    isEmailVerified: { type: String },
    isPhoneVarified: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const Admin = (0, mongoose_1.model)('admins', adminSchema);
exports.default = Admin;
