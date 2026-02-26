const { Propertymodel } = require('../Models/Property.model');
const { JWT_SECRET } = require('../Config/env_export')
const jwt = require('jsonwebtoken')
const { z } = require('zod');
function jwtverify(value) {
    return jwt.verify(value, JWT_SECRET)
}
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
            return res.send({
                message: "wrong format",
                error: parsedbody.error.issues
            })
        }
        const { name, address, type } = parsedbody.data
        const usertoken=req.headers.token
        if(!usertoken){
            return res.status(401).send({
                message:"owner is not logged in"
            })
        }
        const owner = jwtverify(usertoken).userid
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