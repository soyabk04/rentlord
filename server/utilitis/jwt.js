const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../Config/env_export')

function jwtconverter(value) {
    try {  const coded=jwt.sign(value, JWT_SECRET, { expiresIn: "7d" }) 
         return coded
}
    catch (err) {
        throw new Error("Token generation failed")
    }

}
module.exports=jwtconverter