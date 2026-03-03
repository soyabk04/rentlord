const express = require("express");
const Payment= express.Router()
const {payment,userpayments,update,paymentdelete}=require('../Controller/payment.controller')
const {tokenCheck,authorize}=require('../Middlewares/auth.middleware')
const {paymentFormat}=require('../Middlewares/reqFormat.middleware')

Payment.post('/create',tokenCheck,authorize('owner'),paymentFormat,payment)
Payment.post('/upadate',tokenCheck,authorize('owner'),paymentFormat,update)
Payment.post('/delete',tokenCheck,authorize('owner'),paymentdelete)
Payment.get('/data',tokenCheck,userpayments)

module.exports=Payment