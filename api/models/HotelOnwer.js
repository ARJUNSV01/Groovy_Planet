import mongoose from "mongoose"

const HotelOwnerSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required:true
    },
    lastname:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true,
        unique:true
    },
    isBlocked:{
        type:Boolean
    }

    
},{timestamps:true})

export default mongoose.model("HotelOwner",HotelOwnerSchema)