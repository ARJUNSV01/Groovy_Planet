import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import {useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import { signupSchema } from '../../validations/hotelOwner/signupSchema';
import axios from 'axios';
import { serverURL } from '../../../serverURL';
import { useState } from 'react';
import OtpVerification from '../../user/signup/OtpVerification';

//const color = red[50];
const theme = createTheme();


export default function SignUp() {

  const[phoneNumber,setPhoneNumber] = useState('')
  const[otp,setOtp] = useState('')
  const IsPhoneNoValid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber);
  const formOptions = { resolver: yupResolver(signupSchema) };
  const{register,handleSubmit,reset,formState}=useForm(formOptions);
  const{errors}=formState


  const submitForm = (data) => {
    console.log(data);
    try{
      
      axios.post(`${serverURL}/auth/hotelOwnerSignup`,data)
      

    }catch(err){
console.log(err);
    }
  }   
  const [otpModalOpen, setOtpModalOpen] = useState("");

  const handleOtpModal = () => {
    setOtpModalOpen(false);
  };
  const handleOtp = (otpNumber)=>{
    otpNumber = parseInt(otpNumber)
    setOtp(otpNumber)
  }

  const sentOtp = async () => {
    setOtpModalOpen(true);

    try {
      const response = await axios.post(
        `${serverURL}/auth/sendOtp`,
        { phoneNumber: phoneNumber, email: "" },
        { withCredentials: true }
      );
      console.log(response);
      setOtpModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
       <div>
    {otpModalOpen ? (
        <OtpVerification
          onChange={handleOtpModal}
          MobileNumber={phoneNumber}
          saveOtp={handleOtp}
        />
      ) : (
        ""
      )}
      </div>
    <div className='pb-5 pt-1 ' style={{ backgroundImage: `url(../../../hotelbggg.jpg)`,backgroundSize:'cover', height:'100%'}}>
      
     <ThemeProvider  theme={theme}>
       
       {/* <div  className="container mb-5 pb-5"> */}
       {/* <Typography sx={{marginBottom:5}} color ={`${color}`} component="h1" variant="h4">
           Please register to start listing your properties
          </Typography>  */}
          <div className="d-flex ms-2">
              <p style={{fontFamily:'"Lucida Console", "Courier New"'}} className='fs-1 fw-bold  text-light mx-auto mt-3  ' >Please Register to start listing your properties... </p>
              </div>
       <Container sx={{marginBottom:9}} component="mai" maxWidth="xs">
       <p  style={{color:'transparent'}}>w</p>
       
         
       {/* <Container  component="main" maxWidth="xs"> */}
         {/* <div className="row pb-5">
           <div className="col-md-7">
             <p style={{fontStyle: "italic"  , fontFamily: '"Times New Roman", Times, serif'}} className="heading fs-1 text-white me-5 mt-5 pt-5">
               Complete the registration to start listing your properties
             </p>
           </div> */}
           {/* <div className="col-md-5"> */}
        <CssBaseline />
        {/* <div className="card p-5"> */}
        <Box
          sx={{
            marginTop: 5,
            padding:3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
            backgroundColor: "white",
            opacity:0.9,
            

          }}
        >
           {/* <Typography sx={{marginBottom:5}} color ={`${color}`} component="h1" variant="h4">
           Signup to create an account
          </Typography>  */}
      
          <Avatar sx={{ mb:2, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
          <p className='fs-3 fw-bold  text-dark'> Signup </p>
          <form onSubmit={handleSubmit(submitForm)}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  {...register("firstName")}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
               {errors.firstName?<p className='text-danger mt-2'>{errors.firstName.message}</p>:''}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  {...register("lastName")}
                  name="lastName"
                  autoComplete="family-name"
                />
                {errors.lastName?<p className='text-danger mt-2'>{errors.lastName.message}</p>:''}
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("email")}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
             {/* <div className="invalid-feedback">{errors.email?.message}</div> */}
             {errors.email?<p className='text-danger mt-2'>{errors.email.message}</p>:''}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                  autoComplete="phoneNumber"
                />
                {/* {errors.phoneNumber?<p className='text-danger mt-2'>{errors.phoneNumber.message}</p>:''} */}
                {phoneNumber && (
                <small
                  style={IsPhoneNoValid ? { color: 'green' } : { color: 'red' }}
                >
                  {IsPhoneNoValid ? (
                    ''
                  ) : (
                    <span>Please provide valid number</span>
                  )}
                </small>
              )}
              </Grid>
                {IsPhoneNoValid &&!otp ? (
              <Grid item xs={12}>
                  <Link
                  className="ms-1  fw-bold"
                  variant="body2"
                  onClick={sentOtp}
                  sx={{cursor:'pointer',textDecoration:'none'}}>
                  Verify phone number
                </Link>
                </Grid>
                ):""}
                {otp?(
                  <Grid item xs={12}>
                    <p className='text-success ms-1 my-0'>Phone number verified <i className="fa fa-check" aria-hidden="true"></i></p>
                  </Grid>
                ):''}
                
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  {...register("password")}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password?<p className='text-danger mt-2'>{errors.password.message}</p>:''}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="cPassword"
                  autoComplete="new-password"
                />
            {errors.confirmPassword?<p className='text-danger mt-2'>{errors.confirmPassword.message}</p>:''}
              </Grid>
              {/* <Grid item xs={12}>
                <input 
                type='file'
                name='personalId'
                {...register("personalId")}
                />
              </Grid> */}
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> 
          
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" className='fw-bold' variant="body2" sx={{textDecoration:'none'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            
          </Box>
          </form>
           
        </Box>
       
        {/* </div> */}
        {/* </div> */}
       
        </Container>
     {/* </div> */}
    </ThemeProvider>
    </div>
   
    </>
  );
}