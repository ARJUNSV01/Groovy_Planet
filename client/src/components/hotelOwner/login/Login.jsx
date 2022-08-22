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



const color = red[50];
const theme = createTheme();
export default function SignUp() {

  const formOptions = { resolver: yupResolver(signupSchema) };
  const{register,handleSubmit,reset,formState}=useForm(formOptions);
  const{errors}=formState

  const submitForm = (data) => {
    try{
      axios.post(`${serverURL}/auth/hotelOwnerSignup`,data)

    }catch(err){

    }
  }   

  return (
    <div style={{ backgroundImage: "linear-gradient(#02aab0, #00cdac)",  backgroundSize: "cover",height:'100vh',backgroundRepeat:'no-repeat'}}>
     <ThemeProvider  theme={theme}>
       
       <div className="container">
       <p style={{color:'transparent'}}>w</p>
         
       {/* <Container  component="main" maxWidth="xs"> */}
         <div className="row">
           <div className="col-md-7">
             <p style={{fontStyle: "italic"  , fontFamily: '"Times New Roman", Times, serif'}} className="heading fs-1 text-white me-5 mt-5 pt-5">
               Complete the registration to start listing your properties
             </p>
           </div>
           <div className="col-md-5">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        {/* <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
           <Typography sx={{marginBottom:5}} color ={`${color}`} component="h1" variant="h4">
           Register
          </Typography> 
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
               {errors.firstName?<p className='text-primary mt-2'>{errors.firstName.message}</p>:''}
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
                {errors.lastName?<p className='text-primary mt-2'>{errors.lastName.message}</p>:''}
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
             {errors.email?<p className='text-primary mt-2'>{errors.email.message}</p>:''}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                />
                {errors.phoneNumber?<p className='text-primary mt-2'>{errors.phoneNumber.message}</p>:''}
              </Grid>
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
                {errors.password?<p className='text-primary mt-2'>{errors.password.message}</p>:''}
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
            {/* <p>{errors.confirmPassword&&"passwords should match"}</p>  */}
            {errors.confirmPassword?<p className='text-primary mt-2'>{errors.confirmPassword.message}</p>:''}
              </Grid>
              <Grid item xs={12}>
                <input type='file'/>
              </Grid>
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
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            
          </Box>
          </form>
           
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
        </div>
        </div>
        {/* </Container>  */}
       
     </div>
    </ThemeProvider>
    </div>
  );
}