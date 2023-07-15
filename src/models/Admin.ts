import { Schema, model } from 'mongoose'

const adminSchema = new Schema({
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
})

const Admin = model('admins', adminSchema)
export default Admin
