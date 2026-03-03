
const {Usermodel}=require('../Models/User.model')
const { ApiError } = require('../utils/AppError')
const { jwtDecoder, jwtConverter } = require('../utils/jwt')
const refreshAndaccess = require('../utils/refreshAndaccess')


async function generaterefresh(req,res,next) {
try{    const token=req.cookies.refreshToken
    if(!token){
        throw new ApiError(403,"refresh token not found")
    }
    const decoded=jwtDecoder(token)
    const user=await Usermodel.findById(decoded.userid)
    if(!user){
        throw new ApiError(401,"invalid token")
    }
    const { accessToken } = refreshAndaccess(user)
    res.status(200).send({
        success:true,
        accessToken:accessToken
    })}catch(err){
        next(err)
    }
}
module.exports=generaterefresh