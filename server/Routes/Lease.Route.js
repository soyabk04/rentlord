const express = require("express");
const Lease= express.Router()
const { createLease ,userleases}=require('../Controller/lease.controller')
const {authLimiter}=require('../Middlewares/rateLimit.middleware')
const {tokenCheck,authorize}=require('../Middlewares/auth')
Lease.post('/create',tokenCheck,authorize("owner"),createLease)
Lease.get('/data',tokenCheck,userleases)


module.exports=Lease