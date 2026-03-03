const { Usermodel } = require('../Models/User.model');
const bcrypt = require('bcrypt')
const passwordhashing = require('../utils/bcrypt')
const { jwtConverter, jwtDecoder } = require('../utils/jwt')
const ApiError = require("../utils/AppError");
const refreshAndaccess=require('../utils/refreshAndaccess')


async function signup(req, res, next) {
    try {

        const { email, name, password, role } = req.validateddata
        const hashedPassword = await passwordhashing(password)
        const user = await Usermodel.create({
            email: email,
            password: hashedPassword
            ,
            name: name,
            role: role,
        })
        const userid = jwtConverter({
            userid: user._id,
            role: user.role
        })
        req.userId = userid
        next()
    }
    catch (err) {
        next(err)
    }


}
async function signin(req, res, next) {
    try {

        const { email, password } = req.validateddata
        const user = await Usermodel.findOne({
            email: email
        })
        if (!user) {
            throw new ApiError(
                404,
                "User not found"
            )
        }
        const {refreshToken,accessToken}=refreshAndaccess(user)
        const match = await bcrypt.compare(password, user.password);
        if (!match) {

            throw new ApiError(
                401,
                "wrong password"
            )
        }

        res.cookie("token",refreshToken, {
            httpOnly: true,
            secure: false,        // true ONLY in production with HTTPS
            sameSite: "lax"       // important for localhost
        });

        res.status(200).json({
            success: true,
            message: "Login successful",accessToken:accessToken
        });
    } catch (e) {
        next(e)
    }
}
async function userData(req, res, next) {
    try {
        const token = req.token

        const userid = jwtDecoder(token).userid
        const user = await Usermodel.findById(userid).select('-password')
        if (!user) {
            throw new ApiError(409, 'user not found')
        }
        res.status(200).send({
            success: true,
            data: user
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { signup, signin, userData }