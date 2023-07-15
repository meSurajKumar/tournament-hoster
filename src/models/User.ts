import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    teamName: { type: String },
    teamNameSmall : { type : String},
    role:{type: String},
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
})

const User = model('users', userSchema)
export default User
