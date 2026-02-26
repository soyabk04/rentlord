const express=require('express');
const user=require('./Routes/user.Route')
const property=require('./Routes/property.Route')
const {main}=require('./Config/db')
const Lease = require('./Routes/Lease.Route');
const Payment=require('./Routes/payment.Route')
const {errorHandler}=require('./Middlewares/errorHandle.middleware')
require("dotenv").config();
const app= express()


app.use(express.json())
app.use('/user',user)
app.use('/property',property)
app.use('/lease',Lease)
app.use('/payment',Payment)

app.listen(3000,main)
app.use(errorHandler)
