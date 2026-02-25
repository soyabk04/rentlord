const bcrypt=require('bcrypt')
async function passwordhashing(value) {

    try { const pass= await bcrypt.hash(value, 10)
        return pass
     }
    catch (err) {
        throw new Error("Password generation failed")
    }
}
module.exports=passwordhashing