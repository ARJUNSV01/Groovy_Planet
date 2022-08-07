import {configureStore } from '@reduxjs/toolkit'
// import loginReducer from '../components/user/login/loginSlice'
import authReducer from '../features/auth/authSlice.js'

// import  signUpReducer  from '../components/user/signup/signupSlice'

export const store = configureStore ({
    reducer:{
        auth :authReducer ,
      
        
    }
})