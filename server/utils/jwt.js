const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../Config/env_export')
const { errorHandler } = require('../Middlewares/errorHandle.middleware')
const ApiError = require('./AppError')

function jwtConverter(value) {
    try {
        const coded = jwt.sign(value, JWT_SECRET, { expiresIn: "7d" })
        return coded
    }
    catch (err) {
        throw new Error("Token generation failed")
    }

}
function jwtDecoder(value) {
    if (!value) {
        throw new ApiError(401, "Token missing");

} try {
        const coded = jwt.verify(value, JWT_SECRET)
        return coded
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new ApiError(401, "Token expired");
        }

        if (err.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid token");
        }

        throw new ApiError(401, "Authentication failed");
    }

}
module.exports = { jwtConverter, jwtDecoder }