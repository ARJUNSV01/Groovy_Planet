import { createSlice } from "@reduxjs/toolkit";
const initialState={
    show:false
}

export const ModalSlice = createSlice({
    name:'modalcontrol',
    initialState,
    reducers:{
        setShow : (state,action)=>{
            state.show =!state.show
        }
    }
})
export default ModalSlice.reducer
export const {setShow} =ModalSlice.actions