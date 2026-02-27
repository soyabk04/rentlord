
const ApiError = require('../utils/AppError');
const { Usermodel } = require('../Models/User.model');
const { jwtDecoder } = require('../utils/jwt');
const { errorHandler } = require('./errorHandle.middleware');
function tokenChecker(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "No token provided")
    }
    const token = authHeader.split(' ')[1]
    req.user = jwtDecoder(token)

    next()
}
function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, "Access denied"))
        }
        next()
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

module.exports = { tokenChecker, authorize, isUser }