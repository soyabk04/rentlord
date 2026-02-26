const express = require("express");
const user = express.Router()
const {signup,signin,otp,verifyEmail}=require('../controller/user.controller')
const {signupFormat,signinFormat}=require('../middlewares/reqFormat.middleware')
const {isUser}=require('../middlewares/isUser.middleware')
const {authLimiter}=require('../Middlewares/rateLimit.middleware')



user.post('/signup',authLimiter,signupFormat,isUser,signup,otp)
user.post('/sendotp',authLimiter,otp)
user.post('/verify',verifyEmail)

user.post('/signin',authLimiter,signinFormat,signin)

module.exports=user