import { createError } from "../middlewares/createError.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import dotenv from 'dotenv'

export const fetchUsers = asyncHandler(async(req,res)=>{
    const response = await User.find({})
    console.log(response);
    res.status(200).json({users:response})
})
export const blockUser = asyncHandler(async(req,res)=>{
    const {id} = req.query
    await User.updateOne(
        {_id:id},
        {$set:{
            isBlocked:true
        }})
        res.status(200).json({message:'User has been blocked'})
})
export const unBlockUser = asyncHandler(async(req,res)=>{
    const {id} = req.query
    await User.updateOne(
        {_id:id},
        {$set:{
            isBlocked:false
        }})
        res.status(200).json({message:'User has been unblocked'})
})