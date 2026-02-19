const mongoose = require('mongoose')



const paymentSchema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    lease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lease"
    },

    paymentMethod: {
        type: String,
        enum: ["cash", "card", "upi"]
        , default: "cash"
    },
    dueamount: {
        type: Number,
        default: 0,
    },
    paidamount: {
        type: Number,
        default: 0,
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    dueDate: {
        type: Date,
        required: true
    },
    paidat: {
    type: Date,
    required: true
},
    status: {
    type: String,
    enum: ["pending", "partial", "paid"],
    default: "pending"
},


})
module.exports = mongoose.model("Payment", paymentSchema);