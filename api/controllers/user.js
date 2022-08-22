import { createError } from "../middlewares/createError.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import Destinations from "../models/Destinations.js";
import Places from "../models/Places.js";

dotenv.config();

export const search = asyncHandler(async(req,res)=>{
 const response =   await Destinations.find()
 console.log(response);
 res.status(200).json({data:response})
})
export const fetchDestinationDetails =asyncHandler(async(req,res)=>{
    const destinationId = req.params.id 
    const response = await Destinations.findOne({_id:destinationId})
    console.log(response)
    res.status(200).json({data:response})
})
export const fetchPlaces = asyncHandler(async(req,res)=>{
    const response = await Places.find()
    console.log(response);
    res.status(200).json({data:response})
}) 
export const fetchPlaceDetails = asyncHandler(async(req,res)=>{
    console.log('lo');
    const placeId = req.params.id
    const response = await Places.findOne({_id:placeId})
    console.log(response,'the place is');
    res.status(200).json({data:response})
})
