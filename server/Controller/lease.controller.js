const { Leasemodel } = require('../Models/Lease.model');
const { Propertymodel } = require('../Models/Property.model');
const { Usermodel } = require('../Models/User.model');
const { JWT_SECRET } = require('../Config/env_export')
const jwt = require('jsonwebtoken')
const { z } = require('zod');
function jwtverify(value) {
    return jwt.verify(value, JWT_SECRET)
}
async function createLease(req, res) {
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
            return res.send({
                message: "wrong format",
                error: parsedbody.error.issues
            })
        }
        const { tenant, property, paymentMethod, deposit, rent, startDate, endDate, status } = parsedbody.data
        const usertoken = req.headers.token
        if (!usertoken) {
            return res.status(401).send({
                message: "owner is not logged in"
            })
        }
        if (startDate >= endDate) {
            return res.status(400).json({
                message: "Start date must be before end date"
            })
        }
        const isTenant = await Usermodel.findById(tenant)

        if (!isTenant || isTenant.role !== "tenant") {
            return res.status(404).json({
                message: "Invalid tenant"
            })
        }

        const isproperty = await Propertymodel.findById(property)
        if (!isproperty) {
            return res.status(403).send({
                message: "property doesn't exists "
            })
        }
        const owner = jwtverify(usertoken).userid
        if (!isproperty.owner.equals(owner)) {
            return res.status(403).send({
                message: "property doesn't belongs to this owner "
            })
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