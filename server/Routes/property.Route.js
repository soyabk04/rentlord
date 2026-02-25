const express = require("express");
const property= express.Router()
const {createproperty}=require('../Controller/property.controller')
const {authLimiter}=require('../Middlewares/rateLimit.middleware')
property.post('/create',authLimiter,createproperty)

module.exports=property