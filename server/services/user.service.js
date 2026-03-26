const { Usermodel } = require('../Models/User.model');
const bcrypt=require("bcrypt")
const ApiError= require("../utils/AppError");

async function createUser(email, name, password, role) {
            const user = await Usermodel.create({
            email: email,
            password: password
            ,
            name: name,
            role: role,
        })
        return user
}

async function userSignin(email,password){
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
            return user
}

module.exports={createUser,userSignin}