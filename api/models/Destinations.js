import mongoose from 'mongoose'

const DestinationSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    about:{
        type:String
    }
})
export default mongoose.model("Destinations",DestinationSchema)