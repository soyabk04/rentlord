const { Usermodel } = require('../Models/User.model');
async function isUser(req,res,next){
           try{     
            const { email } = req.validateddata
            const isexits = await Usermodel.findOne({
                email: email
            })
            if (isexits) {
                return res.status(409).send({
                    message: 'user already exists'
                })
            }}catch(e){
                console.error(e)
                res.send({
                    message:e
                })
            }
            next()
}
module.exports={isUser}