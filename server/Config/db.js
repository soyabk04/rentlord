const {MONGO_URI}=require('./env_export')
const mongoose=require('mongoose')

async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB connected");
    } catch (err) {
        console.error(" DB connection failed:", err);
       
    }
}

module.exports={main}