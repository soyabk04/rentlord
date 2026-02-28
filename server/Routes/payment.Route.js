const express = require("express");
const Payment= express.Router()
const {payment}=require('../Controller/payment.controller')
const {tokenChecker,authorize}=require('../Middlewares/auth')
Payment.post('/create',tokenChecker,payment)

module.exports=Payment