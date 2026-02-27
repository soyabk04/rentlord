const { Leasemodel } = require('../Models/Lease.model');
const { Propertymodel } = require('../Models/Property.model');
const { Usermodel } = require('../Models/User.model');
const { JWT_SECRET } = require('../Config/env_export')
const jwt = require('jsonwebtoken')
const { z } = require('zod');
const ApiError = require('../utils/AppError');
function jwtverify(value) {
    return jwt.verify(value, JWT_SECRET)
}
async function createLease(req, res,next) {
    try {
        const requiredbody = z.object({
            tenant: z.string(),
            property: z.string(),
            paymentMethod: z.enum(["cash", "card", "upi"], {
                errorMap: () => ({ message: "Invalid payment method" })
            })
            , deposit: z.number(),
            rent: z.number(),
            startDate: z.coerce.date(),
            endDate: z.coerce.date()
            , status: z.enum(["active", "terminated", "expired"], {
                errorMap: () => ({ message: "Invalid status" })
            })
        })
        const parsedbody = requiredbody.safeParse(req.body,)
        if (!parsedbody.success) {

            throw new ApiError(401,parsedbody.error.issues)
        }
        const { tenant, property, paymentMethod, deposit, rent, startDate, endDate, status } = parsedbody.data
        const usertoken = req.headers.token
        if (!usertoken) {

            
        }
        if (startDate >= endDate) {

            throw new ApiError(400,"Start date must be before end date")
            
        }
        const isTenant = await Usermodel.findById(tenant)

        if (!isTenant || isTenant.role !== "tenant") {

        }

        const isproperty = await Propertymodel.findById(property)
        if (!isproperty) {

            throw new ApiError(400,"property doesn't exists ")
        }
        const owner = jwtverify(usertoken).userid
        if (!isproperty.owner.equals(owner)) {

             throw new ApiError(403,"property doesn't belongs to this owner ")
        }

        const lease = await Leasemodel.create({
            tenant, property, paymentMethod, deposit, rent, startDate, endDate, status, owner,
        })
        res.status(200).send({
            message: "lease created sucessfully"
        })
    }
    catch (err) {
next(err)
    }
}

module.exports = {
    createLease
}