const express = require("express");
const user = express.Router()
const { signup, signin, userData ,logout} = require('../Controller/user.controller')
const { signupFormat, signinFormat } = require('../Middlewares/reqFormat.middleware')
const { isUser, isSignedIn, tokenCheck,checklogin } = require('../Middlewares/auth.middleware')
const { authLimiter } = require('../Middlewares/rateLimit.middleware')
const { otp, verifyEmail } = require('../utils/otp');
const { getDashboard } = require("../Controller/dashboard.controller");





user.post('/api/signup', authLimiter, isSignedIn, signupFormat, isUser, signup, otp)
user.post('/api/sendotp', authLimiter, otp)
user.post('/api/verify', verifyEmail)
user.get('/api/profile', tokenCheck, userData)
user.get("/check-login", checklogin);
user.post('/api/signin', authLimiter, isSignedIn, signinFormat, signin)
user.post('/api/logout',tokenCheck,logout)
user.get('/api/dashboard',tokenCheck,getDashboard)


module.exports = user