const express = require("express");
const property= express.Router()
const {createproperty}=require('../Controller/property.controller')

property.post('/create',createproperty)

module.exports=property