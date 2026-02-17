const mongoose=require('mongoose')



const propertySchema= new mongoose.Schema({
    name:String,
    address:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    type:{
        type:String,
        enum:["residential","office","industrial"]
        ,default:"residential"
    }
})