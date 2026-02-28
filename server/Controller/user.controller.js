const { Usermodel } = require('../Models/User.model');
const bcrypt = require('bcrypt')
const passwordhashing = require('../utils/bcrypt')
const { jwtConverter, jwtDecoder } = require('../utils/jwt')
const ApiError = require("../utils/AppError");

function getuserdata(req, res, next) {
    const token = jwtDecoder(req.cookies.token)
    const user = Usermodel.findById(token.userId)
    res.send({
        name: user.name,
        email: user.email,
        role: user.role
    })


}
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
        const match = await bcrypt.compare(password, user.password);
        if (!match) {

            throw new ApiError(
                401,
                "wrong password"
            )
        }
        const token=jwtConverter({
                userid: user._id,
                role: user.role
            },)
        res.status(201).cookie("token", token, {
            httpOnly: true,
            secure: false, // MUST be false in localhost
            sameSite: "lax"
        }).send({
            success: true,
            message: "login sucesssful",
            userid: token,
        })
    } catch (e) {
        next(e)
    }
}

module.exports = { signup, signin, getuserdata }