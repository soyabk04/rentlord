const express = require("express");
const property= express.Router()
const {createproperty,userproperties}=require('../Controller/property.controller');
const { tokenCheck, authorize } = require("../Middlewares/auth");
const {propertyFormat}=require('../Middlewares/reqFormat.middleware')

property.post('/create',tokenCheck,authorize("owner"),propertyFormat,createproperty)
property.get('/data',tokenCheck,userproperties)

module.exports=property