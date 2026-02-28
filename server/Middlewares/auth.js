
const ApiError = require('../utils/AppError');
const { Usermodel } = require('../Models/User.model');
const { jwtDecoder } = require('../utils/jwt');
const {JWT_SECRET}=require('../Config/env_export')

const { errorHandler } = require('./errorHandle.middleware');
function tokenChecker(req, res, next) {
    const authHeader = req.cookies.token

    if (!authHeader) {
        throw new ApiError(401, "No token provided")
    }
    const token = authHeader.split(' ')[1]
    req.user = jwtDecoder(token)

    next()
}
function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            
        }
        next()
    }
}


function isSignedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return next();

    try {
        jwt.verify(token,JWT_SECRET);
        return next(new ApiError(409, "User already signed in"));
    } catch (err) {
        // invalid or expired token → treat as not signed in
        return next();
    }
}
async function isUser(req, res, next) {
    try {
        const { email } = req.validateddata
        const isexits = await Usermodel.findOne({
            email: email
        })
        if (isexits) {
            return res.status(409).send({
                message: 'user already exists'
            })
        }
    } catch (e) {
        e.message="user authentication failed"
        e.status='201'
         next(e)
    }
    next()
}

module.exports = { tokenChecker, authorize, isUser,isSignedIn }