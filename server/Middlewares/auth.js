
const ApiError = require('../utils/AppError');
const { Usermodel } = require('../Models/User.model');
const { jwtDecoder } = require('../utils/jwt');
const { JWT_SECRET } = require('../Config/env_export')

const { errorHandler } = require('./errorHandle.middleware');

function authorize(...roles) {
    return (req, res, next) => {
            token=req.token
    const user=jwtDecoder(token)
        if (!roles.includes(user.role)) {

        }
        next()
    }
}


function isSignedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return next();

    try {
        jwtDecoder(token);
        return next(new ApiError(409, "User already signed in"));
    } catch (err) {
        // invalid or expired token → treat as not signed in
        return next(err);
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
        e.message = "user authentication failed"
        e.status = '201'
        next(e)
    }
    next()
}
function tokenCheck(req, res, next) {
    const token = req.cookies.token
    // console.log(token)
    if (!token) {
        return next(new ApiError(401, 'your are not logged in'))


    }
    req.token = token
    next()
}

module.exports = {  authorize, isUser, isSignedIn, tokenCheck }