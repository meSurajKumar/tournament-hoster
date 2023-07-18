"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class AdminValidation {
    constructor() {
        /**
         * Create Admin validation
         * @param {name , email , password}
         * @return {true  false}
         */
        this.adminSignupValidation = (req, res, next) => {
            const schema = joi_1.default.object({
                name: joi_1.default.string().min(3).max(30).required().messages({
                    'string.min': 'Name should have minimum length of {#limit}',
                    'string.max': 'Name should have maximum length of {#limit}',
                    'any.required': 'Name is required',
                }),
                email: joi_1.default.string().email().required().messages({
                    'string.email': 'Email is Not Valid',
                    'any.required': 'Email is required'
                }),
                password: joi_1.default.string().min(6).max(12).required().messages({
                    'string.min': 'Password should have minimum length of {#limit}',
                    'string.max': 'Password should have maximum length of {#limit}',
                    'any.required': 'Password is required',
                }),
            });
            const { error } = schema.validate(req.body);
            if (error)
                return res.status(400).send({ message: error.details[0].message });
            return next();
        };
        /**
         * Login Admin Validation
         * @param {email, password}
         * @return {true , false}
         */
        this.adminLoginValidation = (req, res, next) => {
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required().messages({
                    'string.email': 'Email is not Valid',
                    'any.required': 'Email is required'
                }),
                password: joi_1.default.string().min(6).max(12).required().messages({
                    'string.min': 'Password should have minimun lenght of {#limit}',
                    'string.max': 'Password should have maximun lenght of {#limit}',
                    'any.required': 'Password is required'
                })
            });
            const { error } = schema.validate(req.body);
            if (error)
                return res.status(400).send({ message: error.details[0].message });
            return next();
        };
    }
}
const adminValidation = new AdminValidation();
exports.default = adminValidation;
