const {MONGO_URI}=require('./env_export')
const mongoose=require('mongoose')
const ApiError=require('../utils/AppError')

async function main() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("DB connected")
    } catch (err) {
        console.error("Database connection failed:", err.message)
       
    }
}

module.exports={main}