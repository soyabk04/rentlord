const {Paymentmodel}=require('../Models/Payment.model')
const {Leasemodel}=require('../Models/Lease.model');
const ApiError = require('../utils/AppError');

async function payment(req,res,next){
    try {
    const { leaseId, year, month, dueDate, dueamount ,paidate, paymentMethod,status} = req.parsedbody.data;

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

    res.status(201).json({
      success:true,
      message: "Monthly rent generated",
      payment,
    });

  } catch (err) {
    next(err)
  }
}
async function userpayments(req,res,next){
    try {    
        const token = req.token
        const userdata = jwtDecoder(token)

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

        res.status(200).json({
            success:true,
            data:payments
        })

    } catch(err){
       console.error(err)
        return next(err)
    }
}

module.exports={payment,userpayments}