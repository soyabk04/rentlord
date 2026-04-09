const { Leasemodel } = require('../Models/Lease.model');
const { Propertymodel } = require('../Models/Property.model');
const { Usermodel } = require('../Models/User.model');
const ApiError = require('../utils/AppError');
const {jwtDecoder}=require('../utils/jwt')
const {createLeaseService,leaseupdateservice,leasedeleteservice,userleasesservices}=require('../services/lease.service')

async function createLease(req, res, next) {
    try {
        const parsedbody = req.parsedbody       
        const { tenant, property, paymentMethod, deposit, rent, startDate, endDate, status } = parsedbody.data
        const usertoken = jwtDecoder(req.token).userid
        await createLeaseService(tenant,property, paymentMethod, deposit, rent, startDate, endDate, status, usertoken)
        res.status(200).send({
            success: true,
            message: "lease created sucessfully"
        })
    }
    catch (err) {
        next(err)
    }
}

async function userleases(req, res, next) {
    try {
        const token = req.token
        const userdata = jwtDecoder(token)

        const leases = await userleasesservices(token, userdata)

        res.status(200).json({
            success: true,
            data: leases
        })

    } catch (err) {
        console.error(err)
        return next(err)
    }
}
async function leasedelete(req, res, next) {
    try {
        const user = jwtDecoder(req.token).userid
        const leaseId =  req.headers.leaseid
        await leasedeleteservice(user,leaseId)
        res.status(200).send({
            success: true,
            message: 'lease removed succesfully',
        })
    }
    catch (err) {
        next(err)
    }
}
async function update(req, res, next) {
    try {
        const user = jwtDecoder(req.token).userid
        const leaseId = req.headers.leaseid
        console.log(leaseId)
        const data = req.parsedbody.data
        const updatelease =await leaseupdateservice(user,leaseId,data)
        res.status(200).send({
            success: true,
            message: 'lease updated succesfully',
            data: updatelease
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = {
    createLease, userleases, leasedelete, update
}