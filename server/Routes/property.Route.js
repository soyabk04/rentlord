const express = require("express");
const property= express.Router()
const {createproperty,userproperties}=require('../Controller/property.controller');
const { tokenCheck, authorize } = require("../Middlewares/auth");

property.post('/create',tokenCheck,authorize("owner"),createproperty)
property.get('/data',tokenCheck,userproperties)

module.exports=property