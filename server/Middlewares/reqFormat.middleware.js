const { z } = require('zod')
async function signupFormat(req,res,next){
    const requiredbody = z.object({
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
        req.validateddata = parsebodywithsucess.data
        next()
}
function signinFormat(req,res,next){
            const requiredbody = z.object({
            email: z.string().max(100).email(),
            password: z.string().min(8).max(100)
            })
        const parsebodywithsucess=requiredbody.safeParse(req.body)
        if(!parsebodywithsucess.success){
            return res.status(400).send(parsebodywithsucess.error.issues)
    
        }
        req.validateddata = parsebodywithsucess.data
        next()
}
module.exports={signupFormat,signinFormat}