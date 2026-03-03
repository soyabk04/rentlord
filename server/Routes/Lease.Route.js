const express = require("express");
const Lease= express.Router()
const { createLease ,userleases,update,leasedelete}=require('../Controller/lease.controller')
const {authLimiter}=require('../Middlewares/rateLimit.middleware')
const {tokenCheck,authorize}=require('../Middlewares/auth.middleware')
const {leaseFormat}=require('../Middlewares/reqFormat.middleware')
Lease.post('/create',tokenCheck,authorize("owner"),leaseFormat,createLease)
Lease.post('/update',tokenCheck,authorize("owner"),leaseFormat,update)
Lease.post('/delete',tokenCheck,authorize("owner"),leasedelete)
Lease.get('/data',tokenCheck,userleases)


module.exports=Lease