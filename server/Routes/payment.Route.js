const express = require("express");
const Payment= express.Router()
const {payment}=require('../Controller/payment.controller')
Payment.post('/create',payment)

module.exports=Payment