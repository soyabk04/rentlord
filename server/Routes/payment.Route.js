const express = require("express");
const Payment= express.Router()
const {payment,userpayments,update,paymentdelete}=require('../Controller/payment.controller')
const {tokenCheck,authorize}=require('../Middlewares/auth.middleware')
const {paymentFormat}=require('../Middlewares/reqFormat.middleware')

Payment.post('/',tokenCheck,paymentFormat,payment)
Payment.patch('/update',tokenCheck,authorize('owner'),paymentFormat,update)
Payment.delete('/delete',tokenCheck,authorize('owner'),paymentdelete)
Payment.get('/',tokenCheck,userpayments)

module.exports=Payment