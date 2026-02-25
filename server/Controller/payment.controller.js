const {Paymentmodel}=require('../Models/Payment.model')
const {Leasemodel}=require('../Models/Lease.model')

async function payment(req,res){
    try {
    const { leaseId, year, month, dueDate, dueamount } = req.body;

    const lease = await Leasemodel.findById(leaseId);
    if (!lease) return res.status(404).json({ message: "Lease not found" });

  
    const exists = await Paymentmodel.findOne({
      lease: leaseId,
      year,
      month,
    });

    if (exists) {
      return res.status(400).json({ message: "Payment already exists for this month" });
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
    res.status(500).json({ message: err.message });
  }
}
module.exports={payment}