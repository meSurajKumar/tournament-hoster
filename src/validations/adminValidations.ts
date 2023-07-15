import { Request , Response , NextFunction } from "express";
import Joi from 'joi'

class AdminValidation{
    constructor(){}

/**
 * Create Admin validation
 * @param {name , email , password}
 * @return {true  false}
 */
  adminSignupValidation = (req:Request , res:Response , next:NextFunction)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required().messages({
            'string.min' :'Name should have minimum length of {#limit}',
            'string.max' :'Name should have maximum length of {#limit}',
            'any.required' :'Name is required',
        }),
        email: Joi.string().email().required().messages({
            'string.email' : 'Email is Not Valid',
            'any.required' : 'Email is required'
        }),
        password : Joi.string().min(6).max(12).required().messages({
            'string.min' : 'Password should have minimum length of {#limit}',
            'string.max' : 'Password should have maximum length of {#limit}',
            'any.required' : 'Password is required',
        }),
    })
    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send({message : error.details[0].message})
    return next()
  }

/**
 * Login Admin Validation
 * @param {email, password}
 * @return {true , false}
 */
  adminLoginValidation = (req:Request , res:Response , next:NextFunction)=>{
    const schema = Joi.object({
        email : Joi.string().email().required().messages({
            'string.email' :'Email is not Valid',
            'any.required' :'Email is required'
        }),
        password : Joi.string().min(6).max(12).required().messages({
            'string.min' : 'Password should have minimun lenght of {#limit}',
            'string.max' : 'Password should have maximun lenght of {#limit}',
            'any.required' : 'Password is required'
        })
    })
    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send({message:error.details[0].message})
    return next()
  }


}


const adminValidation = new AdminValidation()
export default adminValidation