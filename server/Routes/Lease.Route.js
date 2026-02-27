const express = require("express");
const Lease= express.Router()
const { createLease }=require('../Controller/lease.controller')
const {authLimiter}=require('../Middlewares/rateLimit.middleware')
Lease.post('/create',createLease)

module.exports=Lease