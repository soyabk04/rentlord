const { getDashboardData } = require("../services/dashboard.service")
const { jwtDecoder } = require("../utils/jwt")

async function getDashboard(req, res,next) {
try{  const userId = jwtDecoder(req.token).userid
console.log(userId)
  const data = await getDashboardData(userId)

  res.send({
    success: true,
    data
  })
}catch(err){
    next(err)
  }
}
module.exports={getDashboard}