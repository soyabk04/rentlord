const express=require('express');
const app= express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send({
        message:"hello world"
    })
    console.log("hello world")
})

app.listen(3000,()=>{
    console.log("server is running")
})