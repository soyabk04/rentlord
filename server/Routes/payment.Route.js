const express = require("express");
const Payment= express.Router()
const {payment,userpayments}=require('../Controller/payment.controller')
const {tokenCheck,authorize}=require('../Middlewares/auth')
Payment.post('/create',tokenCheck,payment)
Payment.get('/data',tokenCheck,userpayments)

module.exports=Payment