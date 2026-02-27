const express = require("express");
const property= express.Router()
const {createproperty}=require('../Controller/property.controller');
const { tokenChecker, authorize } = require("../Middlewares/auth");

property.post('/create',tokenChecker,authorize("owner"),createproperty)

module.exports=property