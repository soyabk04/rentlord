const { Propertymodel } = require('../Models/Property.model');
const {ApiError} = require('../utils/AppError');
const {jwtDecoder}=require('../utils/jwt')
async function createproperty(req, res ,next) {
    try {
        
        const parsedbody=req.parsedbody
        const { name, address, type } = parsedbody.data
        const usertoken=jwtDecoder(req.token)


        const owner = usertoken.userid
        const property = await Propertymodel.create({
            name: name,
            address: address,
            type: type,
            owner: owner
        })
        res.status(200).send({
            success:true,
            message: "property added sucessfully"
            , name: property.name
        })
    }
    catch (err) {
next(err)
    }
}
async function userproperties(req,res,next){
    try {    
        const token = req.token
        const userdata = jwtDecoder(token)

        let properties = []

        if(userdata.role === 'owner'){
            properties = await Propertymodel.find({ owner: userdata.userid })
        }

        if(userdata.role === 'tenant'){
            properties = await Propertymodel.find({ tenant: userdata.userid })
        }
        
        if(properties.length === 0){
            return next(new ApiError(404,'No properties found'))
        }

        res.status(200).json({
            success:true,
            data:properties
        })

    } catch(err){
       console.error(err)
        return next(err)
    }
}
async function update(req,res,next) {
try{   
    
      const user=jwtDecoder(req.token).userid
      const propertyId=req.headers.propertyid
      const property=await Propertymodel.findById(propertyId)
      if(!property){
        throw new ApiError(404,'property not found')
      }
      if(user.toString()!==property.owner.toString()){
        throw new ApiError(401,"property is not owned by you")
      }
      const data= req.parsedbody.data
      const updateProperty=await Propertymodel.findByIdAndUpdate(propertyId,data)
      res.status(200).send({
        success:true,
        message:'property added succesfully'
      })}
      catch(err){
        next(err)
      }
}
async function propertyDelete(req,res,next) {
try{      
      const user=jwtDecoder(req.token).userid
      const propertyId=req.headers.propertyid
      const property=await Propertymodel.findById(propertyId)
      if(!property){
        throw new ApiError(404,'property not found')
      }
      if(user.toString()!==property.owner.toString()){
        throw new ApiError(401,"property is not owned by you")
      }
     
     await Propertymodel.findByIdAndDelete(propertyId)
      res.status(200).send({
        success:true,
        message:'property removed succesfully'
      })}
      catch(err){
        next(err)
      }
}

module.exports={
    createproperty,userproperties,propertyDelete,update
}