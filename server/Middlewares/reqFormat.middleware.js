const { z, number } = require('zod')
const {ApiError}=require('../utils/AppError')
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
function leaseFormat(req,res,next){
            const requiredbody = z.object({
                tenant: z.string(),
                property: z.string(),
                paymentMethod: z.enum(["cash", "card", "upi"], {
                    errorMap: () => ({ message: "Invalid payment method" })
                })
                , deposit: z.number(),
                rent: z.number(),
                startDate: z.coerce.date(),
                endDate: z.coerce.date()
                , status: z.enum(["active", "terminated", "expired"], {
                    errorMap: () => ({ message: "Invalid status" })
                })
            })
            const parsedbody = requiredbody.safeParse(req.body,)
            if (!parsedbody.success) {
    
                throw new ApiError(401,parsedbody.error.issues)
            }
            req.parsedbody=parsedbody
            next()
}
function propertyFormat(req,res,next){
            const requiredbody = z.object({
            address: z.string(),
            name: z.string(),
            type: z.enum(["residential", "office", "industrial"], {
                errorMap: () => ({ message: "Invalid property type" })
            })
        })
        const parsedbody = requiredbody.safeParse(req.body,)
        if (!parsedbody.success) {
            throw new ApiError(401,parsedbody.error.issues)
         
        }
        req.parsedbody=parsedbody
        next()
}
function paymentFormat(req,res,next){
            const requiredbody = z.object({
            leaseId: z.string(),
            year:z.number(),
            month:z.number(),
            paymentMethod: z.enum(["cash", "card", "upi"], {
                errorMap: () => ({ message: "Invalid payment method type" })
            }),
            status: z.enum(["pending", "partial", "paid"], {
                errorMap: () => ({ message: "invalid status type" })
            })
            ,paidate:z.coerce.date(),
            dueDate:z.coerce.date(),
            dueamount:z.number(),

        })
        const parsedbody = requiredbody.safeParse(req.body,)
        if (!parsedbody.success) {
            throw new ApiError(401,parsedbody.error.issues)
         
        }
        req.parsedbody=parsedbody
        next()
}
module.exports={signupFormat,signinFormat,leaseFormat,propertyFormat,paymentFormat}