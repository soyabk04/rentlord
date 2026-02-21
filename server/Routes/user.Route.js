const express = require("express");
const user = express.Router()
const {signup,signin}=require('../Controller/user.controller')
const {signupFormat,signinFormat}=require('../Middlewares/reqFormat.middleware')
const {isUser}=require('../Middlewares/isUser.middleware')

user.post('/signup',signupFormat,isUser,signup)
user.post('/signin',signinFormat,signin)

module.exports=user