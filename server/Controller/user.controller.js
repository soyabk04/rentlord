const { Usermodel } = require('../Models/User.model');
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = require('../Config/env_export')



function jwtconverter(value) {
    try { return jwt.sign(value, JWT_SECRET, { expiresIn: "7d" }) }
    catch (err) {
        throw new Error("Token generation failed")
    }

}
async function passwordhashing(value) {

    try { return await bcrypt.hash(value, 10) }
    catch (err) {
        throw new Error("Password generation failed")
    }
}
async function signup(req, res) {
        try { 

    const {email,name,password,role}=req.validateddata
    const hashedPassword = await passwordhashing(password)
    const user=await Usermodel.create({
        email: email,
        password: hashedPassword
        ,
        name: name,
        role: role,
    })

    res.status(200).send({
        message: "signup successful",
        token:jwtconverter({
            userid:user._id,
            role: user.role,
        })
    })    }
    catch (err) {
        console.error("SIGNUP ERROR:", err)
       return res.status(500).json({
   message: "Internal server error"
   ,error:err.message
})
    }
    

}
async function signin(req,res){
        try { 

    const {email,password}=req.validateddata 
    const user=await Usermodel.findOne({
        email:email
    })
    if(!user){
        return res.status(401).send({
            message:"user not found"
        })
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).send({
            message:"wrong password"
        })
    }
    res.status(201).send({
        message:"login sucesssful",
        userid:jwtconverter({
  userid: user._id,
  role: user.role
},),
    })
}catch(e){
      res.status(500).send({
        message:"Internal server error"
        
       
      })
}
}

module.exports = {signup,signin}