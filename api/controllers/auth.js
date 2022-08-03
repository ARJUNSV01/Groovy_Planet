
import { createError } from "../utils/error.js"
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const userSignUp = async(req,res,next)=>{
    try{
       const user =  await User.create({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:await bcrypt.hash(req.body.password,10),
                phonenumber:req.body.phonenumber
            })
            
        res.status(200).send("user has been created")
    }catch(err){
        next(err)
    }
    
    }
export const userLogin = async(req,res,next)=>{
    console.log(req.body);
        try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(createError(404,"User not found!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,"Invalid password!"))
        const token = jwt.sign({id:user._id,name:user.firstname},process.env.JWT_SECRET_KEY,{expiresIn:'24h'})
        const{password, ...otherDetails} = user._doc
        res
        .cookie("access_token",token,{expire:new Date() + 999,httpOnly:true})
        .status(200)
        .json({...otherDetails})
        }catch(err){
            next(err)
        }
    }
