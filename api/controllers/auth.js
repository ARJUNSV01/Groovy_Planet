import { createError } from "../middlewares/createError.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();





const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import twilio from 'twilio';
import HotelOnwer from "../models/HotelOnwer.js";
const client = twilio(accountSid,authToken)


const ObjectId = mongoose.Types.ObjectId;

// export const userSignUp = async (req, res, next) => {
//   try {
// const user = await User.create({
//   firstname: req.body.firstname,
//   lastname: req.body.lastname,
//   email: req.body.email,
//   password: await bcrypt.hash(req.body.password, 10),
//   phonenumber: req.body.phonenumber,
// });

//     res.status(200).send("user has been created");
//   } catch (err) {
//     next(err);
//   }
// };

// export const userLogin = async (req, res, next) => {
//   try {
// const user = await User.findOne({ email: req.body.email });
// if (!user) return next(createError(404, "User not found!"));
// const isPasswordCorrect = await bcrypt.compare(
//   req.body.password,
//   user.password
// );
// if (!isPasswordCorrect) return next(createError(400, "Invalid password!"));
// const token = jwt.sign(
//   { id: user._id, name: user.firstname },
//   process.env.JWT_SECRET_KEY,
//   { expiresIn: "24h" }
// );
// const { password, ...otherDetails } = user._doc;
// res
//   .cookie("access_token", token, {
//     expire: new Date() + 999,
//     httpOnly: true,
//   })
//   .status(200)
//   .json({ ...otherDetails });
//   } catch (err) {
//     next(err);
//   }
// };

export const userSignUp = asyncHandler(async (req, res, next) => {
  const {firstname,lastname,email,password,phonenumber} = req.body
  const user = await User.create({
    firstname:firstname,
    lastname: lastname,
    email:email,
    password: await bcrypt.hash(password, 10),
    phonenumber:phonenumber,
  });
  res.status(200).send("user has been created");
});

export const userLogin = asyncHandler(async (req, res, next) => {
console.log(req.body);
  const user = await User.findOne({ email:req.body.email });
  if (!user) return next(createError(404, "User not found!"));
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  
  if (!isPasswordCorrect) return next(createError(400, "Invalid password!"));
 
  const token = jwt.sign(
    { id: user._id, name: user.firstname },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
  const { password, ...otherDetails } = user._doc;
  res
    .cookie("access_token", token, {
      expire: new Date() + 999,
      httpOnly: true,
    })
    .status(200)
    .json({ ...otherDetails });
});

export const adminLogin = asyncHandler(async(req,res,next)=>{
  const{email,password} = req.body
  const admin = await Admin.findOne({email:email})
 if(!admin) return next(createError(404,'Username not found'))
 const isPasswordCorrect = await bcrypt.compare(
  password,
  admin.password
);
 if(!isPasswordCorrect) return next(createError(400,'Invalid Password'));
 const accessToken = generateAccessToken({id:admin._id,name:admin.name})
 const refreshToken = jwt.sign({id:admin._id,name:admin.name},process.env.REFRESH_TOKEN_SECRET)

 await Admin.updateOne({_id:ObjectId(admin._id)},{$set:{refreshToken:refreshToken}})

 res.cookie('accessToken',accessToken,{maxAge:6000,httpOnly:true})
 res.cookie('refreshToken',refreshToken,{httpOnly:true})
 res.cookie('adminId',admin._id,{httpOnly:true})
 res.cookie('loggedIn',true)
console.log('login success');
 return res.status(200).json({message:'Success',admin:admin.name})

})

export const token = asyncHandler(async(req,res)=>{
 const {refreshToken,adminId} = req.cookies
  if(!refreshToken) return next(createError(401,'No refresh token'))
  const checkToken = await Admin.findOne({_id:ObjectId(adminId),refreshToken:refreshToken})
  if(!checkToken) return next(createError(403,'Tokens do not match'))
  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,admin)=>{
    if(err) return res.status(403)
    const accessToken =generateAccessToken({name:admin.name})
    res.cookie('accessToken',accessToken,{maxAge:9000,httpOnly:true})
    res.status(202).json({accessToken:accessToken,message:'success'})
  })
})
function generateAccessToken (user) {
 return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10s'} )
}
export const adminLogout = asyncHandler(async(req,res)=>{
  await Admin.updateOne({name:"admin"},{$set:{refreshToken:""}})
 res.clearCookie('refreshToken')
 res.clearCookie('accessToken')
 res.clearCookie('adminId')
 res.clearCookie('loggedIn')
 res.status(200)
 res.end()
 
})

export const test = asyncHandler(async(req,res)=>{
  console.log('you duck');
 return res.status(201).json({message:'you duck'})
})



// import asyncHandler from 'express-async-handler';
// import { createError } from '../../../createError.js';
// const client = twilio(accountSid, authToken);

export const sendOtp = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(accountSid, authToken);
  const Mobilenumber = req.body.phoneNumber;

  const verification = await client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: `+91${Mobilenumber}`, channel: 'sms' });

  console.log(verification);
  return res.status(200).json({ message: verification });

  // console.log(req.body);
  // return res.status(200).json({ message: 'verification' });
});

export const Verifyotp = asyncHandler(async (req, res, next) => {
  console.log(req.body,'ki');
  const { MobileNumber, otp } = req.body;
  console.log('verify otp');
  console.log(MobileNumber,otp);
  await client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({ to: `+91${MobileNumber}`, code: otp })
    .then((verification_check) => {
      console.log(verification_check.status);
      if (verification_check.status == 'approved') {
        return res.status(200).json({ message: 'approved' });
      } else {
        next(createError(400, 'Invalid OTP'));
      }
    })
    .catch((err) => {
      next(createError(400, 'Invalid OTP'));
      console.log(err);
      // reject(err)
    });


    // return res.status(200).json({ message: 'approved' });

});

export const hotelOwnerSignup = asyncHandler(async(req,res)=>{
  const {firstname,lastname,email,password,phonenumber} = req.body
  const user = await HotelOnwer.create({
    firstname:firstname,
    lastname: lastname,
    email:email,
    password: await bcrypt.hash(password, 10),
    phonenumber:phonenumber,
  });
  res.status(200).send("user has been created");
  
})
