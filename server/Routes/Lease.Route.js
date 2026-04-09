const express = require("express");
const Lease= express.Router()
const { createLease ,userleases,update,leasedelete}=require('../Controller/lease.controller')
const {authLimiter}=require('../Middlewares/rateLimit.middleware')
const {tokenCheck,authorize}=require('../Middlewares/auth.middleware')
const {leaseFormat}=require('../Middlewares/reqFormat.middleware')
Lease.post('/',tokenCheck,leaseFormat,createLease)
Lease.patch('/update',tokenCheck,leaseFormat,update)
Lease.delete('/delete',tokenCheck,authorize("owner"),leasedelete)
Lease.get('/',tokenCheck,userleases)


module.exports=Lease