"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const async_1 = __importDefault(require("../middlewares/async"));
const User_1 = __importDefault(require("../models/User"));
const Admin_1 = __importDefault(require("../models/Admin"));
const adminSecreteKey = process.env.ADMIN_SECRETE_KEY || "----";
const userSecreteKey = process.env.USER_SECRETE_KEY || "----";
const adminExpireTime = process.env.ADMIN_TOKEN_EXPIRE_TIME;
const userExpireTime = process.env.USER_TOKEN_EXPIRE_TIME;
class AuthController {
    constructor() {
        /**
         * Create Admin
         * @param {firstName , lastName , dob , phone , email}
         * @return json response
         */
        this.createAdmin = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            let admin = yield Admin_1.default.findOne({ email: email.toLowerCase() });
            if (admin)
                return res.status(400).send({ message: 'User Already Exists' });
            const hashPassword = passwordHash.generate(password);
            const adminData = new Admin_1.default({
                name,
                email,
                password: hashPassword,
                // createdAt : moment.valueOf(),
                // updatedAt : moment.valueOf()
            });
            console.log('here ');
            yield adminData.save();
            Object.assign(adminData, { password: null });
            const token = yield jwt.sign({ id: adminData.id }, adminSecreteKey, { expiresIn: adminExpireTime });
            return res.status(200).send({ message: 'Admin Created Successfully', data: adminData, accessToken: token });
        }));
        /**
         * Admin Login
         * @param {email , password}
         * @return json response
         */
        this.adminlogin = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            let admin = yield Admin_1.default.findOne({ email: email.toLowerCase() });
            if (!admin)
                return res.status(400).send({ message: 'No user found' });
            const isValidPassword = passwordHash.verify(password, admin.password);
            if (!isValidPassword)
                return res.status(401).send({ message: 'Unauthorized User !' });
            Object.assign(admin, { password: null });
            const token = yield jwt.sign({ id: admin.id }, adminSecreteKey, { expiresIn: adminExpireTime });
            return res.status(200).send({ message: 'Login Successfully', data: admin, accesstoken: token });
        }));
        /**
         * Create User
         * @param {teamName, name, phone, password, email, role}
         * @return json response
         */
        this.createUser = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, role, phone, teamName, email, password } = req.body;
            let teamNameInSmall = teamName.toLowerCase();
            let user = yield User_1.default.findOne({ email: email.toLowerCase() });
            if (user)
                return res.status(401).send({ message: 'User Already exist in Team : teamName' });
            const hashPassword = passwordHash.generate(password);
            const userData = new User_1.default({
                password: hashPassword,
                teamNameSmall: teamNameInSmall,
                name, phone, role, teamName, email
            });
            yield userData.save();
            Object.assign(userData, { password: null });
            const token = yield jwt.sign({ id: userData.id }, userSecreteKey, { expiresIn: userExpireTime });
            return res.status(200).send({ message: 'User Created Successfully', data: userData, accessToken: token });
        }));
        /**
         * Login User
         * @param {email, password}
         * @return json response
         */
        this.loginUser = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            let user = yield User_1.default.findOne({ email: email.toLowerCase() });
            if (!user)
                return res.status(401).send({ message: "User not exists." });
            const isValidPassword = passwordHash.verify(password, user.password);
            if (!isValidPassword)
                return res.status(401).send({ message: 'Invalid Password.' });
            Object.assign(user, { password: null });
            const token = yield jwt.sign({ id: user.id }, userSecreteKey, { expiresIn: userExpireTime });
            return res.status(200).send({ message: 'User Login Successfully', data: user, accessToken: token });
        }));
    }
}
const authController = new AuthController();
exports.default = authController;
