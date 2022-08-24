import express from "express"
import { adminLogin, userLogin, userSignUp,token,test, sendOtp, Verifyotp, adminLogout, hotelOwnerSignup } from "../controllers/auth.js"
import { upload } from "../middlewares/fileUploadMulter.js"
import { authenticateToken } from "../middlewares/verifyToken.js"
const router = express.Router()


router.post('/signup',userSignUp)

router.post('/login',userLogin)

router.post('/adminLogin',adminLogin)

router.get('/adminLogout',adminLogout)

router.get('/token',token)

router.get('/test',authenticateToken,test)

router.post('/sendOtp',sendOtp)

router.post('/verifyOtp',Verifyotp)

router.post('/hotelOwnerSignup',hotelOwnerSignup)




    

    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if(!token) return res.status(401)
    // jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    //  if(err) return res.sendStatus(403)
    //  req.user = user
    //  next()
    // })
    // }

export default router