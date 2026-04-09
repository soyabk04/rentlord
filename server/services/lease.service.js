const { Leasemodel } = require('../Models/Lease.model');
const { Propertymodel } = require('../Models/Property.model');
const { Usermodel } = require('../Models/User.model');

const ApiError = require('../utils/AppError');
const {jwtDecoder}=require('../utils/jwt')

async function createLeaseService(
    tenant,
    property,
    paymentMethod,
    deposit,
    rent,
    startDate,
    endDate,
    status,
    ownerId 
) {
    if (!ownerId) {
        throw new ApiError(401, "Unauthorized");
    }

    if (startDate >= endDate) {
        throw new ApiError(400, "Start date must be before end date");
    }


    const isTenant = await Usermodel.findById(tenant);
    if (!isTenant || isTenant.role !== "tenant") {
        throw new ApiError(400, "Invalid tenant");
    }

    const isproperty = await Propertymodel.findById(property);
    console.log(isproperty)
    if (!isproperty) {
        throw new ApiError(400, "Property does not exist");
    }


    if (!isproperty.owner.equals(ownerId)) {
        throw new ApiError(403, "Property does not belong to this owner");
    }


    const lease = await Leasemodel.create({
        tenant,
        property,
        paymentMethod,
        deposit,
        rent,
        startDate,
        endDate,
        status,
        owner: ownerId
    });

    return lease;
}
async function userleasesservices(){
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
        return leases
}
async function leasedeleteservice(user,leaseId){

          const lease=await Leasemodel.findById(leaseId)
          console.log(lease)
          if(!lease){
            throw new ApiError(404,'lease not found')
          }
          if(user.toString()!==lease.owner.toString()){
            throw new ApiError(403,"lease is not owned by you")
          }
          await Leasemodel.findByIdAndDelete(leaseId)

}
async function leaseupdateservice(user,leaseId,data){
            const lease = await Leasemodel.findById(leaseId)
            if (!lease) {
                throw new ApiError(404, 'lease not found')
            }
            if (user.toString() !== lease.owner.toString()) {
                throw new ApiError(403, "lease is not owned by you")
            }

            const updatelease = await Leasemodel.findByIdAndUpdate(lease, data)
}
module.exports={createLeaseService,userleasesservices,leasedeleteservice,leaseupdateservice}