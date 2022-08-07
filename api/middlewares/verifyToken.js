import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401,"You are not authenticated"))
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,userData)=>{
        if(err) return next(createError(403,"Invalid Token "))
        req.user = userData
        next()
    })
}