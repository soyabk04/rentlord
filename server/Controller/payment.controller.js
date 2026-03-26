const {Paymentmodel}=require('../Models/Payment.model')
const {Leasemodel}=require('../Models/Lease.model');
const ApiError = require('../utils/AppError');

async function payment(req,res,next){
    try {
    const { leaseId, year, month, dueDate, dueamount ,paidate, paymentMethod,status} = req.parsedbody.data;

   const payment=await createPayment(leaseId, year, month, dueDate, dueamount ,paidate, paymentMethod,status)

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
async function update(req,res,next) {
try{      
      const user=jwtDecoder(req.token).userid
      const paymentId=req.headers.paymentId
      const payment=await Paymentmodel.findById(paymentId)
      if(!payment){
        throw new ApiError(404,'payment not found')
      }
      if(user.toString()!==payment.owner.toString()){
        throw new ApiError(401,"payment is not owned by you")
      }
      const data= req.parsedbody.data
      const updatepayment=await payment.findByIdAndUpdate(paymentId,data)
      res.status(200).send({
        success:true,
        message:'payment added succesfully',
        data:updatepayment
      })}
      catch(err){
        next(err)
      }
}
async function paymentdelete(req,res,next) {
try{      
      const user=jwtDecoder(req.token).userid
      const paymentId=req.headers.paymentId
      const payment=await Paymentmodel.findById(paymentId)
      if(!payment){
        throw new ApiError(404,'payment not found')
      }
      if(user.toString()!==payment.owner.toString()){
        throw new ApiError(403,"payment is not owned by you")
      }
      await payment.findByIdAndDelete(paymentId)
      res.status(200).send({
        success:true,
        message:'payment removed succesfully',
     
      })}
      catch(err){
        next(err)
      }
}

module.exports={payment,userpayments, update,paymentdelete}