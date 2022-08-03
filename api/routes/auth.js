import express from "express"
import { userLogin, userSignUp } from "../controllers/auth.js"
const router = express.Router()


// router.get('/',(req,res)=>{
// res.send("This is auth end point")    
// })
router.post('/signup',userSignUp)

router.post('/login',userLogin)




export default router