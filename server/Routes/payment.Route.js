const express = require("express");
const Payment= express.Router()
const {payment,userpayments}=require('../Controller/payment.controller')
const {tokenCheck,authorize}=require('../Middlewares/auth')
const {paymentFormat}=require('../Middlewares/reqFormat.middleware')

Payment.post('/create',tokenCheck,paymentFormat,payment)
Payment.get('/data',tokenCheck,userpayments)

module.exports=Payment