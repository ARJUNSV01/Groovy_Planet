import * as React from 'react';
import { useState,useEffect } from 'react';
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
import axios from 'axios'
import { serverURL } from '../../../serverURL';
import swal from 'sweetalert'
import { validPassword,validEmail } from '../../../regexAuth/RegexAuth';
import { useDispatch,useSelector } from 'react-redux';
import { signUpUser } from '../../../features/auth/authSlice';


const theme = createTheme();


 function Signup(props) {
   const dispatch = useDispatch()

   const { userName, isLoading, signUpError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
 
  console.log(userName,isLoading);

   const [signupError,setSignUpError] = useState()
    const handleSubmit =  (event) => {
      // setSignUpError("")
        event.preventDefault();
        const data = new FormData(event.currentTarget);
       

         const email = data.get('email')
         const password = data.get('password')
         const firstname = data.get('firstName')
         const lastname = data.get('lastName')
         const phonenumber = data.get('phonenumber')
          
        
        const formData={
            email,
            password,
            firstname,
            lastname,
            phonenumber
        }
 console.log(formData);

 dispatch(signUpUser (formData))
        
  //  axios.post(`${serverURL}/auth/signup`,formData).then((response)=>{
  //      console.log('ok');
  //   console.log(response.data);
  //   swal("h")
  //      props.closeModal()

  //  }).catch((err)=>{
  //      console.log('errrrrr',err)
  //      console.log(err.response.data.message);
  //      setSignUpError("User already exists")
  //  })
      };
    const handleAction = ()=>{
        props.changeAction('signup')
    }
  return (
    <div><ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        
        <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phonenumber"
                label="Phone number"
                type="number"
                id="phonenumber"
                // autoComplete="new-password"
              />
            </Grid> 
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            
             <p className='text-danger mt-3 fs-6 mx-auto'>{signUpError?'User already exists':''}</p>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
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
          
            {/* <Grid >
              <Typography variant="body2">
                Already have an account?
              </Typography>
            </Grid> */}
          <Grid>
              <Typography sx={{display:'block', mt:3}}  align='center' variant="h7">
                {"Already have an account?"}<Link onClick={handleAction} variant='h7' color="primary" style={{cursor:'pointer'}} underline='none'> Login</Link>
              </Typography>
              </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  </ThemeProvider></div>
  )
}

export default Signup