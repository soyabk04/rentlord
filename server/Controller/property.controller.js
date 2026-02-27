const { Propertymodel } = require('../Models/Property.model');
const { JWT_SECRET } = require('../Config/env_export')
const jwt = require('jsonwebtoken')
const { z } = require('zod');
const ApiError = require('../utils/AppError');

async function createproperty(req, res ,next) {
    try {
        const requiredbody = z.object({
            address: z.string(),
            name: z.string(),
            type: z.enum(["residential", "office", "industrial"], {
                errorMap: () => ({ message: "Invalid property type" })
            })
        })
        const parsedbody = requiredbody.safeParse(req.body,)
        if (!parsedbody.success) {

         
        }
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
            message: "property added sucessfully"
            , name: property.name
        })
    }
    catch (err) {
next(err)
    }
}

module.exports={
    createproperty
}