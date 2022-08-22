import mongoose from 'mongoose'
const PlacesSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    about:{
        type:String
    }
})
export default mongoose.model("Place",PlacesSchema)