const express=require('express');
const user=require('./Routes/user.Route')
const property=require('./Routes/property.Route')
const {main}=require('./Config/db')
const Lease = require('./Routes/Lease.Route');
const Payment=require('./Routes/payment.Route')
const {errorHandler}=require('./Middlewares/errorHandle.middleware')
const cookieParser = require('cookie-parser');
const cors=require('cors')
require("dotenv").config();
const app= express()
app.use(cors({
    origin: ["http://127.0.0.1:5500" ,"http://localhost:5500"],// your frontend URL
    credentials: true
}));


app.use(express.json())
app.use(cookieParser());
app.use('/user',user)
app.use('/property',property)
app.use('/lease',Lease)
app.use('/payment',Payment)

app.listen(3000,main)
app.use(errorHandler)
