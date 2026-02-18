const express=require('express');
const user=require('./Routes/userRoute')
const {MONGO_URI}=require('./Config/env_export')
const mongoose=require('mongoose')
require("dotenv").config();

const app= express()

app.use(express.json())
app.use('/user',user)

app.get("/",(req,res)=>{
    res.send({
        message:"hello world"
    })
    console.log("hello world")
})
console.log(MONGO_URI)

async function  main(){
    await mongoose.connect(MONGO_URI)
    app.listen(3000)
    console.log("db connected")
}
main()