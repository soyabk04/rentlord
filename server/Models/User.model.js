const mongoose=require('mongoose');
const { email, boolean } = require('zod');

const userSchema= new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    role:{
        type:String,
        enum:["admin","tenant","owner"]
        ,default:"tenant"
    },
    emailVerified:{type:boolean,default:false}

})
const otpSchema=new mongoose.Schema({
    email:String,
    otp:Number,
    expiresAt: { type: Date, expires: 0 }
})
const Usermodel=mongoose.model("User", userSchema);
const Otpmodel=mongoose.model("Otp", otpSchema);
module.exports = {Usermodel,Otpmodel}
