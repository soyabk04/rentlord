const express = require("express");
const property= express.Router()
const {createproperty,userproperties, update, propertyDelete}=require('../Controller/property.controller');
const { tokenCheck, authorize } = require("../Middlewares/auth.middleware");
const {propertyFormat}=require('../Middlewares/reqFormat.middleware')

property.post('/',tokenCheck,authorize("owner"),propertyFormat,createproperty)
property.post('/update',tokenCheck,authorize("owner"),propertyFormat,update)
property.post('/delete',tokenCheck,authorize("owner"),propertyDelete)
property.get('/',tokenCheck,userproperties)

module.exports=property