const {jwtConverter}=require('./jwt')

function refreshAndaccess(user){
    const refreshToken=jwtConverter({userid:user._id},"7d")
    const accessToken=jwtConverter({userid:user._id,role:user.role},"15m")
    return{refreshToken,accessToken}
}
module.exports=refreshAndaccess