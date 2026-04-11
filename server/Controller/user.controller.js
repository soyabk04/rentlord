const { Usermodel } = require('../Models/User.model');
const bcrypt = require('bcrypt')
const passwordhashing = require('../utils/bcrypt')
const { jwtConverter, jwtDecoder } = require('../utils/jwt')
const ApiError = require("../utils/AppError");
const refreshAndaccess = require('../utils/refreshAndaccess');
const { createUser, userSignin } = require('../services/user.service');
const { success } = require('zod');



async function signup(req, res, next) {
    try {

        const { email, name, password, role } = req.validateddata
        const hashedPassword = await passwordhashing(password)
        const user = await createUser(email, name, hashedPassword, role)
        req.userId = user._id
        next()
    }
    catch (err) {
        next(err)
    }


}
async function signin(req, res, next) {
    try {

        const { email, password } = req.validateddata
        const user = await userSignin(email, password)

        const { refreshToken, accessToken } = refreshAndaccess(user)


        res.cookie("token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(200).json({
            success: true,
            message: "Login successful", accessToken: accessToken
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
const logout = (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: '/'
        });
        res.send({
            success: true,
            message: 'logged out'
        });
    }
    catch (err) {
        next(err)
    }
}
module.exports = { signup, signin, userData, logout }