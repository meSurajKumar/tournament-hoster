"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
const adminValidations_1 = __importDefault(require("../validations/adminValidations"));
// Admin Routes
router.post('/admin/signup', [adminValidations_1.default.adminSignupValidation], authController_1.default.createAdmin);
router.post('/admin/login', [adminValidations_1.default.adminLoginValidation], authController_1.default.adminlogin);
// User Router
router.post('/user/signup', authController_1.default.createUser);
router.post('/user/login', authController_1.default.loginUser);
module.exports = router;
