const {Paymentmodel}=require('../Models/Payment.model')
const {Leasemodel}=require('../Models/Lease.model');
const ApiError = require('../utils/AppError');
const { userpaymentsservice, createPayment, updatepayment } = require('../services/payment.service');

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

        const payments= await userpaymentsservice(userdata)

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
      const data= req.parsedbody.data
      const upadatepayment=await updatepayment( user,paymentId,data)

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
      paymentdeleteservice(user,paymentId)
      res.status(200).send({
        success:true,
        message:'payment removed succesfully',
     
      })}
      catch(err){
        next(err)
      }
}

module.exports={payment,userpayments, update,paymentdelete}