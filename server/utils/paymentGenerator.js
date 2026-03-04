
const { Leasemodel } = require('../Models/Lease.model')
const { Paymentmodel } = require('../Models/Payment.model')

async function paymentGenerator() {
    const now=new Date()
    const month=now.getMonth()+1
    const year=now.getFullYear()
    const activeLeases = await Leasemodel.find({ status: "active" })
    for (const lease of activeLeases) {
        try {
            await Paymentmodel.create({
                lease: lease._id,
                owner: lease.owner,
                tenant: lease.tenant,
                property:lease.property,
                dueamount: lease.rent,
                month,
                year,
                dueDate: new Date(year, month - 1, 5),
                status: "pending"
            })
        }catch(err){
        if(err.code===11000){
            console.log("payment already exists")
        }else{
            console.error(err)
        }
    }
    }
}
module.exports=paymentGenerator