const express = require("express");
const Lease= express.Router()
const { createLease }=require('../Controller/lease.controller')
const {authLimiter}=require('../Middlewares/rateLimit.middleware')
const {tokenChecker,authorize}=require('../Middlewares/auth')
Lease.post('/create',tokenChecker,authorize("owner"),createLease)

module.exports=Lease