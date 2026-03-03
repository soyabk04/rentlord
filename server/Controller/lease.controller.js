const { Leasemodel } = require('../Models/Lease.model');
const { Propertymodel } = require('../Models/Property.model');
const { Usermodel } = require('../Models/User.model');
const ApiError = require('../utils/AppError');

async function createLease(req, res,next) {
    try {
        const parsedbody=req.parsedbody
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
            success:true,
            message: "lease created sucessfully"
        })
    }
    catch (err) {
next(err)
    }
}

async function userleases(req,res,next){
    try {    
        const token = req.token
        const userdata = jwtDecoder(token)

        let leases = []

        if(userdata.role === 'owner'){
            payments = await Leasemodel.find({ owner: userdata.userid })
        }

        if(userdata.role === 'tenant'){
            payments = await Leasemodel.find({ tenant: userdata.userid })
        }
        
        if(properties.length === 0){
            return next(new ApiError(404,'No properties found'))
        }

        res.status(200).json({
            success:true,
            data:payments
        })

    } catch(err){
       console.error(err)
        return next(err)
    }
}
async function leasedelete(req,res,next) {
try{      
      const user=jwtDecoder(req.token).userid
      const leaseId=req.params.leaseId
      const lease=await Leasemodel.findById(leaseId)
      if(!lease){
        throw new ApiError(404,'lease not found')
      }
      if(user.toString()!==lease.owner.toString()){
        throw new ApiError(403,"lease is not owned by you")
      }
      await Leasemodel.findByIdAndDelete(leaseId)
      res.status(200).send({
        success:true,
        message:'lease removed succesfully',
      })}
      catch(err){
        next(err)
      }
}
async function update(req,res,next) {
try{      
      const user=jwtDecoder(req.token).userid
      const leaseId=req.params.leaseId
      const lease=await Leasemodel.findById(leaseId)
      if(!lease){
        throw new ApiError(404,'lease not found')
      }
      if(user.toString()!==lease.owner.toString()){
        throw new ApiError(403,"lease is not owned by you")
      }
      const data= req.parsedbody.data
      const updatelease=await lease.findByIdAndUpdate(lease,data)
      res.status(200).send({
        success:true,
        message:'lease updated succesfully',
        data:updatelease
      })}
      catch(err){
        next(err)
      }
}
module.exports = {
    createLease,userleases,leasedelete,update
}