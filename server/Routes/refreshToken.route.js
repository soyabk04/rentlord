const express = require("express");
const generaterefresh = require("../Controller/accessToken.controller");
const refreshToken= express.Router()

refreshToken.get("/",generaterefresh)

module.exports=refreshToken