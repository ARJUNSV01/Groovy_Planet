import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import adminRoute from "./routes/admin.js"
import userRoute from "./routes/users.js"
import cors from 'cors'
import cookieParser from "cookie-parser"
import path from 'path'
import { fileURLToPath } from 'url';
import bodyParser from "body-parser"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
dotenv.config()

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB");
    }catch(error){
        throw error;
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected");
})
//middlewares

app.use(cors({origin:true,credentials:true}));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.json());
app.use("/auth",authRoute)
app.use("/admin",adminRoute)
app.use("/user",userRoute)


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

app.listen(8800,()=>{
    connect()
    console.log("Connected to the Backend");
})