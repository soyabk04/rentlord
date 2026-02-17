const { Usermodel } = require('../Models/Usermodel');
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const { JWT_SECRET } = require('../Config/env_export')
const bcrypt = require('bcrypt')


function jwtconverter(value) {
    try { return jwt.sign(value, JWT_SECRET, { expiresIn: "7d" }) }
    catch (err) {
        throw new Error("Token generation failed")
    }

}
async function passwordhashing(value) {

    try { return await bcrypt.hash(value, 10) }
    catch (err) {
        throw new Error("Password generation failed")
    }
}
async function signup(req, res) {
        try { const requiredbody = z.object({
        email: z.string().max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(8).max(100)
            .regex(/[A-Z]/, "Must contain uppercase letter")
            .regex(/[a-z]/, "Must contain lowercase letter")
            .regex(/[0-9]/, "Must contain number")
            .regex(/[@$!%*?&]/, "Must contain special character"),
        role: z.enum(["owner", "tenant"], {
            errorMap: () => ({ message: "Only owner and tenant roles are allowed" })
        })
    })
    const parsebodywithsucess = requiredbody.safeParse(req.body)
    if (!parsebodywithsucess.success) {
        return res.status(400).send({
            error: parsebodywithsucess.error.issues
        })
    }
    const { email, name, password, role } = parsebodywithsucess.data

    const isexits = await Usermodel.findOne({
        email: email
    })
    if (isexits) {
        return res.status(409).send({
            message: 'user already exists'
        })
    }
    const hashedPassword = await passwordhashing(password)
    const user=await Usermodel.create({
        email: email,
        password: hashedPassword
        ,
        name: name,
        role: role,
    })

    res.status(200).send({
        message: "signup successful",
        token:jwtconverter({
            userid:user._id,
            role: user.role,
        })
    })    }
    catch (err) {
       return res.status(500).json({
   message: "Internal server error"
})
    }
    

}
async function signin(req,res){
        try { 
        const requiredbody = z.object({
        email: z.string().max(100).email(),
        password: z.string().min(8).max(100)
        })
    const parsebodywithsucess=requiredbody.safeParse(req.body)
    if(!parsebodywithsucess.success){
        return res.status(400).send(parsebodywithsucess.error.issues)

    }
    const {email,password}=parsebodywithsucess.data
    const user=await Usermodel.findOne({
        email:email
    })
    if(!user){
        return res.status(401).send({
            message:"user not found"
        })
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).send({
            message:"wrong password"
        })
    }
    res.send({
        message:"login sucesssful",
        userid:jwtconverter({
  userid: user._id,
  role: user.role
},),
    })
}catch(e){
      res.status(500).send({
        message:"Internal server error"
       
      })
}
}

module.exports = {signup,signin}