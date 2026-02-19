const express = require("express");
const Lease= express.Router()
const {createLease}=require('../Controller/lease.controller.')
Lease.post('/create',createLease)

module.exports=Lease