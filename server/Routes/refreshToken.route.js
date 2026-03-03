const express = require("express");
const generaterefresh = require("../Controller/accessToken.controller");
const refresh= express.Router()

refresh.get("/",generaterefresh)

module.exports=refreshToken