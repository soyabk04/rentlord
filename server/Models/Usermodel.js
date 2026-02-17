const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    role:{
        type:String,
        enum:["admin","tenent","owner"]
        ,default:"tenent"
    }
})
module.exports = mongoose.model("User", userSchema);
