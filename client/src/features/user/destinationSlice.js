import { createSlice } from "@reduxjs/toolkit";
const initialState={
    destinationData:{},
    placeData:{ }
}

const destinationSlice = createSlice({
    name:'destination',
    initialState,
    reducers:{
        setDestinationData : (state,action)=>{
            state.destinationData = action
        },
        setPlaceData : (state,action)=>{
            state.placeData = action
        }
    }

})
export const {setDestinationData,setPlaceData} = destinationSlice.actions
export default destinationSlice.reducer