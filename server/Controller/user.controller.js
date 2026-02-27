const { Usermodel } = require('../Models/User.model');
const bcrypt = require('bcrypt')
const passwordhashing = require('../utils/bcrypt')
const jwtconverter = require('../utils/jwt')
const { Otpmodel } = require('../Models/User.model');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const { SENDBIRD_API, FROM_EMAIL } = require('../Config/env_export')
const ApiError = require("../utils/AppError")




function sendmail(email, otp) {

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false,
            auth: {
                user: "apikey",
                pass: SENDBIRD_API,
            },
        });


        (async () => {
            const info = await transporter.sendMail({
                from: `"soyab" <${FROM_EMAIL}>`,
                to: `${email}`,
                subject: "Hello ✔",
                text: `otp is ${otp}`,
                html: `otp is ${otp}`,
            });

            console.log("Message sent:", info.messageId);
        })();
    } catch (e) {
        console.error(e.response)
        res.send({
            message: e.response
        })
    }
}

async function verifyEmail(req, res, next) {
    const { otp, email } = req.body
    const userOtp = await Otpmodel.findOne({
        email: email
    })
    const user = await Usermodel.findOne({
        email: email
    })
    if (user.emailVerified) {
        res.send({
            message: "email is already verified"
        })
    }
    if (String(otp) !== String(userOtp.otp)) {
        res.send({
            message: "incorrect otp"
        })

    }

    user.emailVerified = true
    await user.save()

    await Otpmodel.deleteOne({
        email
    })
    res.send({
        message: "emailverified"
    })
}
async function otp(req, res, next) {
    try {
        const otp = crypto.randomInt(100000, 999999)
        const user = await Otpmodel.create({
            email: req.body.email,
            otp: otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        })
        sendmail(req.body.email, otp)
        res.send({
            message: "otp sent successfully"
        })
    }
    catch (e) {
        next(e)
    }


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

        // res.status(200).send({
        //     message: "signup successful",
        //     token: jwtconverter({
        //         userid: user._id,
        //         role: user.role,
        //     })
        // })
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
        res.status(201).send({
            message: "login sucesssful",
            userid: jwtconverter({
                userid: user._id,
                role: user.role
            },),
        })
    } catch (e) {
        next(e)
    }
}

module.exports = { signup, signin, otp, verifyEmail }