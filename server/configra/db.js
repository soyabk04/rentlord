const ApiError = require('../utils/AppError');
const {MONGO_URI}=require('./env_export')
const mongoose=require('mongoose')

async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB connected");
    } catch (err) {
        throw new ApiError(400,"DB did connect");
    }
}

module.exports={main}