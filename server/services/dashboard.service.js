const { Leasemodel } = require("../Models/Lease.model")
const { Propertymodel } = require("../Models/Property.model")
const {Paymentmodel}=require("../Models/Payment.model")
const mongoose = require("mongoose")

async function getDashboardData(userId) {
  const currentMonth = new Date().getMonth()+1;
  const currentYear = new Date().getFullYear();
  const properties = await Propertymodel.find({ owner: userId })
  const leases = await Leasemodel.find({ owner: userId })
  const payments=await Paymentmodel.find({ owner: userId,
    month:currentMonth,
    year:currentYear
  })
  // aggregation logic
  const totalProperties = properties.length
  const occupied = leases.filter(l => l.status === "active").length
  const vacant = totalProperties - occupied
  let monthlyEarning=0;
  let dueamount=0;
  for(const payment of payments){
    monthlyEarning+=payment.paidamount
  }
    for(const payment of payments){
    dueamount+=payment.dueamount
  }
 const now = new Date()

// 1. get aggregation
const rawData = await Paymentmodel.aggregate([
  {
         $match: {
      owner: new mongoose.Types.ObjectId(userId)
    }
  },
  {
    $group: {
      _id: { month: "$month", year: "$year" },
      total: { $sum: "$paidamount" }
    }
  }
])

// 2. convert to map for fast lookup
const dataMap = {}

for (const item of rawData) {
  const key = `${item._id.month}-${item._id.year}`
  dataMap[key] = item.total
}

// 3. build last 6 months
console.log(dataMap)
const last6Months = []
for (let i = 5; i >= 0; i--) {
  const date = new Date()
  date.setMonth(now.getMonth() - i)

  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const key = `${month}-${year}`

  last6Months.push({
    month,
    year,
    total: dataMap[key] || 0 // ✅ fill missing months
  })
}

  return {
    totalProperties,
    occupied,
    vacant,
    monthlyEarning,
    dueamount,last6Months
  }
}
module.exports={getDashboardData}