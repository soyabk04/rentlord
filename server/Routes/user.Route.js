const express = require("express");
const user = express.Router()
const {signup,signin}=require('../Controller/user.controller')

user.post('/signup',signup)
user.post('/signin',signin)

module.exports=user