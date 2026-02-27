const {Paymentmodel}=require('../Models/Payment.model')
const {Leasemodel}=require('../Models/Lease.model');
const ApiError = require('../utils/AppError');

async function payment(req,res,next){
    try {
    const { leaseId, year, month, dueDate, dueamount } = req.body;

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
    });

    res.status(201).json({
      message: "Monthly rent generated",
      payment,
    });

  } catch (err) {
    next(err)
  }
}
module.exports={payment}