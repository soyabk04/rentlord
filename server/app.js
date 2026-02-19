const express=require('express');
const user=require('./Routes/user.Route')
const property=require('./Routes/property.Route')
const {main}=require('./Config/db')
const mongoose=require('mongoose')
require("dotenv").config();

const app= express()

app.use(express.json())
app.use('/user',user)
app.use('/property',property)

app.listen(3000,main)