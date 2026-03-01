const express = require("express");
const Lease= express.Router()
const { createLease ,userleases,}=require('../Controller/lease.controller')
const {authLimiter}=require('../Middlewares/rateLimit.middleware')
const {tokenCheck,authorize}=require('../Middlewares/auth')
const {leaseFormat}=require('../Middlewares/reqFormat.middleware')
Lease.post('/create',tokenCheck,authorize("owner"),leaseFormat,createLease)
Lease.get('/data',tokenCheck,userleases)


module.exports=Lease