

function errorHandler (err, req, res, next) {
 const status=err.statusCode||err.status||500;
 const message=err.message||"backend error"
   if (err.code === 11000) {
    statusCode = 400
    message = "Duplicate field value entered"
  }


  if (err.name === "ValidationError") {
    statusCode = 400
    message = Object.values(err.errors)
      .map(val => val.message)
      .join(", ")
  }
  const response={success:false,message}
 return res.status(status).send(response)
}

module.exports={
    errorHandler
}