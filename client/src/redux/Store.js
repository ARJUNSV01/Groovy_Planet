import {configureStore } from '@reduxjs/toolkit'
import adminReducer from '../features/auth/adminSlice.js'

// import loginReducer from '../components/user/login/loginSlice'
import authReducer from '../features/auth/authSlice.js'
import destinationReducer from '../features/user/destinationSlice.js'
import ModalSlice from '../features/user/ModalSlice.js'

// import  signUpReducer  from '../components/user/signup/signupSlice'

export const store = configureStore ({
    reducer:{
        auth :authReducer,
        admin:adminReducer,
        destination:destinationReducer,
        modalControl:ModalSlice
        
    }
})