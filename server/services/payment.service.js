const {Paymentmodel}=require('../Models/Payment.model')
const {Leasemodel}=require('../Models/Lease.model');
const ApiError = require('../utils/AppError');
async function createPayment(leaseId, year, month, dueDate, dueamount ,paidate, paymentMethod,status) {
     const lease = await Leasemodel.findById(leaseId);
    if (!lease) {
      throw new ApiError(404,"lease not found")
    }

  
    const exists = await Paymentmodel.findOne({
      lease: leaseId,
      year,
      month,
    });

    if (exists) {
     
      throw new ApiError(404,"Payment already exists for this month")
    }

    const payment = await Paymentmodel.create({
      tenant: lease.tenant,
      owner: lease.owner,
      property: lease.property,
      lease: leaseId,
      year,
      month,
      dueDate,
      dueamount,
      paidate,
      paymentMethod,
      status
    });
    return payment
}
async function userpaymentsservice(userdata){
          let payments = []

        if(userdata.role === 'owner'){
            payments = await Paymentmodel.find({ owner: userdata.userid })
        }

        if(userdata.role === 'tenant'){
            payments = await Paymentmodel.find({ tenant: userdata.userid })
        }
        
        if(properties.length === 0){
            return next(new ApiError(404,'No properties found'))
        }
        return payments
}
async function upadatepayment(user,paymentId,data){
        const payment=await Paymentmodel.findById(paymentId)
        if(!payment){
          throw new ApiError(404,'payment not found')
        }
        if(user.toString()!==payment.owner.toString()){
          throw new ApiError(401,"payment is not owned by you")
        }
        const updatepayment=await payment.findByIdAndUpdate(paymentId,data)
        return upadatepayment
}
async function paymentdeleteservice(paymentId,user){
        const payment=await Paymentmodel.findById(paymentId)
      if(!payment){
        throw new ApiError(404,'payment not found')
      }
      if(user.toString()!==payment.owner.toString()){
        throw new ApiError(403,"payment is not owned by you")
      }
      await payment.findByIdAndDelete(paymentId)
}
module.exports={userpaymentsservice,createPayment ,upadatepayment,paymentdeleteservice}