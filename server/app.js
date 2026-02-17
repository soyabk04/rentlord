const express=require('express');
const user=require('./Routes/userRoute')
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

async function  main(){
    await mongoose.connect('mongodb+srv://soyabk048:dH7kZDZB00qU5SHG@cluster0.q1ksepn.mongodb.net/rentlord')
    app.listen(3000)
    console.log("db connected")
}
main()