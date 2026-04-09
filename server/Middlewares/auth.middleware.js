const ApiError = require('../utils/AppError');
const { Usermodel } = require('../Models/User.model');
const { jwtDecoder } = require('../utils/jwt');

function authorize(...roles) {
    return (req, res, next) => {
            const token=req.token
    const user=jwtDecoder(token)
    // console.log(user)
    //     if (!roles.includes(user.role)) {
    //         return res.status(403).send({
    //             success:false,
    //             message:'role is not valid'
    //          })
    //     }
        next()
    }
}


function isSignedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return next();

    try {
    jwtDecoder(token)
        return next(new ApiError(409, "User already signed in"));
    } catch (err) {
       
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
        e.message = "user authentication failed"
        e.status = '500'
        next(e)
    }
    next()
}
function tokenCheck(req, res, next) {
    // const token = req.cookies.token
    const token = req.headers.token
    console.log(token)
    if (!token) {
        return next(new ApiError(402, 'your are not logged in'))


    }
    req.token = token
    next()
}
function checklogin(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.json({ loggedIn: false })
    }

    try {
        const loggin= jwtDecoder(token);
        res.json({ loggedIn: true, user: loggin })

    } catch(e) {
        res.json({ loggedIn: false ,message:e.message})
    }

}
module.exports = {  authorize, isUser, isSignedIn, tokenCheck,checklogin }