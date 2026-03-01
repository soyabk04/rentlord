const express = require("express");
const user = express.Router()
const {signup,signin,userData}=require('../Controller/user.controller')
const {signupFormat,signinFormat}=require('../Middlewares/reqFormat.middleware')
const {isUser ,isSignedIn,tokenCheck}=require('../Middlewares/auth')
const {authLimiter}=require('../Middlewares/rateLimit.middleware')
const {otp,verifyEmail}=require('../utils/otp')



user.post('/signup',authLimiter,isSignedIn,signupFormat,isUser,signup,otp)
user.post('/sendotp',authLimiter,otp)
user.post('/verify',verifyEmail)
user.get('/profile',tokenCheck,userData)

user.post('/signin',authLimiter,isSignedIn,signinFormat,signin)


module.exports=user