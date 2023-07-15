// import express from 'express';
import express from 'express'
const router = express.Router()
import authController from '../controllers/authController'
import adminValidation from '../validations/adminValidations'

// Admin Routes
router.post('/admin/signup',[adminValidation.adminSignupValidation],authController.createAdmin)
router.post('/admin/login',[adminValidation.adminLoginValidation],authController.adminlogin)

// User Router
router.post('/user/signup',authController.createUser)
router.post('/user/login',authController.loginUser)


module.exports = router