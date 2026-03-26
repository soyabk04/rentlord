const {Leasemodel}=require('../Models/Lease.model')

async function expireLease() {
    const now = new Date();
    const leases=await Leasemodel.find({status:'active'})
    for(const lease of leases){
        if (now>=lease.endDate ){
           await Leasemodel.updateOne({_id: lease._id}, {status: "expired"})
        }
    }
    
}

module.exports=expireLease