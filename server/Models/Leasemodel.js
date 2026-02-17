const mongoose=require('mongoose')



const leaseSchema= new mongoose.Schema({
    tenant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    } ,
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    paymentMethod:{
        type:String,
        enum:["cash","card","upi"]
        ,default:"cash"
    },
    deposit:{
        type:Number,
        default:0,
    },
    rent:{
        type:Number,
        default:0,
    }
    ,startDate:{
        type:Date,
        required:true
    }
    ,endDate:{
        type:Date,
        required:true
    }
    ,status:{
        type:String,
        enum:["active","terminated","expired"]
        ,default:"active"
    }

})
module.exports = mongoose.model("Lease", leaseSchema);