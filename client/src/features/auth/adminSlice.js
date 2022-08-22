import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// const initialState={
//     admin:true
// }

// export const adminSlice = createSlice({
//     name:'admin',
//     initialState,
//     reducers:{
//         setAdmin:(state)=>{
//             state.admin=false
//         }
//     }
// })
// export const {setAdmin} = adminSlice.actions
// export default adminSlice.reducer   import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { serverURL } from "../../serverURL";


const initialState = {
    user:null,
    email:null,
    signUpError:false,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    isLoggedIn:false,
    show:false,
    
}

export const signUpUser = createAsyncThunk(
    'users/signUp',
    async (userData,thunkAPI) =>{
        try {
         const response = await axios.post(`${serverURL}/auth/signup`,userData) 
         const data = response.data
         toast.success('Signup Successful')
         return { ...data }
        } catch (error) {
                console.log(error);
                toast.error('Email already exists')
                return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
export const loginUser = createAsyncThunk(
    'users/login',
    async (userData,thunkAPI) =>{
        try {
         const response = await axios.post(`${serverURL}/auth/login`,userData) 
         const data = response.data
         console.log(data);
         toast.success('Authentication Successful')
         return { ...data }
        } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
                return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const adminSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset : (state)=>{
            state.user = null
            state.email = null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isLoggedIn = false
            state.message = ''
          
        },
        setShoow: (state)=>{
            state.show=!state.show
        }
    },
    extraReducers : {
        [signUpUser.fulfilled] : (state,action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.signUpError = false
            state.message = 'User has been created  '
        },
        [signUpUser.pending] : (state) =>{
            state.isLoading = true
        },
        [signUpUser.rejected] : (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.signUpError = true
            state.message = action.payload.message
        },
        [loginUser.fulfilled] : (state,action) => {
            state.user = action.payload.firstname
            state.email = action.payload.email
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.loginError = false
            state.message = 'User logged in  '
            state.isLoggedIn = true
        },
        [loginUser.pending] : (state) =>{
            state.isLoading = true
        },
        [loginUser.rejected] : (state,action)=>{
            state.user = null
            state.email = null
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.loginError = true
            state.message = action.payload.message
            state.isLoggedIn = false
        }      
    }
})
export const {reset,setShoow} = adminSlice.actions
export default adminSlice.reducer    