const express=require('express');
const user=require('./Routes/user.Route')
const property=require('./Routes/property.Route')
const {main}=require('./Config/db')
const Lease = require('./Routes/Lease.Route');
const Payment=require('./Routes/payment.Route')
const {errorHandler}=require('./Middlewares/errorHandle.middleware')
const cookieParser = require('cookie-parser');
const cron = require("node-cron")
const refreshToken=require('./Routes/refreshToken.route')
const paymentGenerator=require('./utils/paymentGenerator')
const paymentReminder=require('./utils/paymentReminder')
const cors=require('cors')
require("dotenv").config();
const app= express()
app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}));
cron.schedule("0 0 1 * *", async () => {
  console.log("Running monthly rent generation...")
  await paymentGenerator()
})
cron.schedule("0 * * * *", async () => {
  console.log(" sending rent reminders")
  await paymentReminder()
})

app.use(express.json())
app.use(cookieParser());
app.use('/user',user)
app.use('/refreshtoken',refreshToken)
app.use('/property',property)
app.use('/lease',Lease)
app.use('/payment',Payment)

app.listen(3000,main)
app.use(errorHandler)
