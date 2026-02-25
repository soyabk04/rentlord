const express = require("express");
const user = express.Router()
const {signup,signin,otp,verifyEmail}=require('../Controller/user.controller')
const {signupFormat,signinFormat}=require('../Middlewares/reqFormat.middleware')
const {isUser}=require('../Middlewares/isUser.middleware')

user.post('/signup',signupFormat,isUser,signup,otp)
user.post('/sendotp',otp)
user.post('/verify',verifyEmail)
user.post('/signin',signinFormat,signin)

module.exports=user