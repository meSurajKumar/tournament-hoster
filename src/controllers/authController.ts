import { Response , Request } from 'express';
const passwordHash = require('password-hash')
import moment, { tz } from 'moment-timezone'
const jwt = require('jsonwebtoken');
import asyncMiddleware from '../middlewares/async';
import User from '../models/User';
import Admin from '../models/Admin';
import async from '../middlewares/async';
const adminSecreteKey = process.env.ADMIN_SECRETE_KEY || "----"
const userSecreteKey = process.env.USER_SECRETE_KEY || "----"
const adminExpireTime = process.env.ADMIN_TOKEN_EXPIRE_TIME
const userExpireTime = process.env.USER_TOKEN_EXPIRE_TIME

class AuthController {
    constructor() { }

    /**
     * Create Admin
     * @param {firstName , lastName , dob , phone , email}
     * @return json response 
     */
    createAdmin = asyncMiddleware(async (req: any, res: Response) => {
        const { name, email, password } = req.body
        let admin = await Admin.findOne({ email: email.toLowerCase() })
        if (admin) return res.status(400).send({ message: 'User Already Exists' })
        const hashPassword = passwordHash.generate(password)
        const adminData = new Admin({
            name,
            email,
            password: hashPassword,
            // createdAt : moment.valueOf(),
            // updatedAt : moment.valueOf()
        })
        console.log('here ')
        await adminData.save()
        Object.assign(adminData , {password:null})
        const token = await jwt.sign({id:adminData.id} ,adminSecreteKey,{expiresIn:adminExpireTime})
        return res.status(200).send({message : 'Admin Created Successfully', data:adminData , accessToken : token})


    })
    /**
     * Admin Login
     * @param {email , password}
     * @return json response 
     */
    adminlogin = asyncMiddleware(async(req:Request , res:Response)=>{
        const {email , password } = req.body
        let admin = await Admin.findOne({email : email.toLowerCase()})
        if(!admin) return res.status(400).send({message:'No user found'})
        const isValidPassword = passwordHash.verify(password , admin.password)
        if(!isValidPassword) return res.status(401).send({message : 'Unauthorized User !'})
        Object.assign(admin,{password:null})
        const token = await jwt.sign({id:admin.id},adminSecreteKey,{expiresIn:adminExpireTime})
        return res.status(200).send({message :'Login Successfully', data:admin , accesstoken:token})
    })

    /**
     * Create User
     * @param {teamName, name, phone, password, email, role}
     * @return json response 
     */
    createUser = asyncMiddleware(async(req:Request , res:Response)=>{
        const {name,role,phone,teamName , email , password} = req.body
        let teamNameInSmall = teamName.toLowerCase()
        let user = await User.findOne({email:email.toLowerCase()});
        if(user) return res.status(401).send({message : 'User Already exist in Team : teamName'})

        const hashPassword = passwordHash.generate(password)
        const userData = new User({
            password:hashPassword,
            teamNameSmall:teamNameInSmall,
            name , phone , role , teamName,email    
        })
        await userData.save()
        Object.assign(userData,{password:null})
        const token = await jwt.sign({id:userData.id} , userSecreteKey , {expiresIn:userExpireTime})
        return res.status(200).send({message:'User Created Successfully' ,data:userData , accessToken:token})
    })
    /**
     * Login User
     * @param {email, password}
     * @return json response 
     */
    loginUser = asyncMiddleware(async(req:Request , res:Response)=>{
        const {email , password} = req.body
        let user = await User.findOne({email:email.toLowerCase()});
        if(!user) return res.status(401).send({message :"User not exists."})
        const isValidPassword = passwordHash.verify(password , user.password)
        if(!isValidPassword) return res.status(401).send({message : 'Invalid Password.'})
        Object.assign(user,{password:null})
        const token = await jwt.sign({id:user.id} , userSecreteKey , {expiresIn:userExpireTime})
        return res.status(200).send({message : 'User Login Successfully' , data :user , accessToken :token})
    })




}

const authController = new AuthController()
export default authController