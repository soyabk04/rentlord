const express=require('express');
const user=require('./Routes/user.Route')
const property=require('./Routes/property.Route')
const {main}=require('./Config/db')
const Lease = require('./Routes/Lease.Route');
require("dotenv").config();

const app= express()

app.use(express.json())
app.use('/user',user)
app.use('/property',property)
app.use('/lease',Lease)

app.listen(3000,main)