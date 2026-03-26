const { Otpmodel } = require('../Models/User.model');
const crypto = require('crypto');
const { Usermodel } = require('../Models/User.model');
const {sendmail}=require('./sendmail')
const {jwtConverter} = require('../utils/jwt')

async function otp(req, res, next) {
    try {
        const otp = crypto.randomInt(100000, 999999)
        const user = await Otpmodel.create({
            email: req.body.email,
            otp: otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        })
        sendmail(req.body.email,`otp is ${otp}`)
        res.send({
            success:true,
            otp:'otp sent to '+req.body.email
        })
    }
    catch (e) {
        next(e)
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
        return res.send({
            message: "email is already verified"
        })
    }
    if (String(otp) !== String(userOtp.otp)) {
        return res.send({
            message: "incorrect otp"
        })

    }
    const token=jwtConverter({
        userId:user._id,
        role:user.role
    })
    user.emailVerified = true
    await user.save()

    await Otpmodel.deleteOne({
        email
    })
res.cookie("token", token, {
    httpOnly: true,
    secure: false, // MUST be false in localhost
    sameSite: "lax"
})
.status(200)
.json({ success: true });
}
module.exports={otp,verifyEmail}