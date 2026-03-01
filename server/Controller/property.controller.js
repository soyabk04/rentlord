const { Propertymodel } = require('../Models/Property.model');
const { JWT_SECRET } = require('../Config/env_export')
const jwt = require('jsonwebtoken')
const { z } = require('zod');
const ApiError = require('../utils/AppError');
const {jwtDecoder}=require('../utils/jwt')

async function createproperty(req, res ,next) {
    try {
        
        const parsedbody=req.parsedbody
        const { name, address, type } = parsedbody.data
        const usertoken=req.user

        const owner = usertoken.userid
        const property = await Propertymodel.create({
            name: name,
            address: address,
            type: type,
            owner: owner
        })
        res.status(200).send({
            success:true,
            message: "property added sucessfully"
            , name: property.name
        })
    }
    catch (err) {
next(err)
    }
}
async function userproperties(req,res,next){
    try {    
        const token = req.token
        const userdata = jwtDecoder(token)

        let properties = []

        if(userdata.role === 'owner'){
            properties = await Propertymodel.find({ owner: userdata.userid })
        }

        if(userdata.role === 'tenant'){
            properties = await Propertymodel.find({ tenant: userdata.userid })
        }
        
        if(properties.length === 0){
            return next(new ApiError(404,'No properties found'))
        }

        res.status(200).json({
            success:true,
            data:properties
        })

    } catch(err){
       console.error(err)
        return next(err)
    }
}

module.exports={
    createproperty,userproperties
}