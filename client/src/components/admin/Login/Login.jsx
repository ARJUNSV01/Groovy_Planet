import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
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
import {useForm} from "react-hook-form";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { serverURL } from '../../../serverURL';
import { yupResolver } from '@hookform/resolvers/yup';
import {loginSchema} from '../../validations/admin/loginSchema'

const theme = createTheme();
const handleTest = async ()=>{
  try {
    const response = await axios.get(`${serverURL}/auth/test`,{withCredentials:true})
    console.log(response);
    
  } catch (error) {
    if(error.response.status === 403 || 401) {
      try {
        const response2 = await axios.get(`${serverURL}/auth/token`,{withCredentials:true})
        console.log(response2);
        const response3 = await axios.get(`${serverURL}/auth/test`,{withCredentials:true})
        console.log(response3);
      } catch (error) {
        console.log(error);
      }
        
    }
  }
}
function Login() {
  
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies();
  const formOptions = { resolver: yupResolver(loginSchema) };
  const{register,handleSubmit,formState}=useForm(formOptions);
  const{errors}=formState
  
    
  const  onSubmit = async(data)=>{
      try{
      await axios.post(`${serverURL}/auth/adminLogin`,data,{withCredentials:true})
      toast.success('Authentication Successful')
      // const token = response.data.token
      // localStorage.setItem('adminToken',token)
      // setCookie('adminLogged',true)
      navigate('/admin/dashboard')
      
      }catch(err){
        console.log(err)
        
        toast.error(err.response.data.message)
      }
    }
    
  return (
    <div>
    <Grid item xs={5} md={8}>
    <ThemeProvider theme={theme}>
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
      <Typography component="h1" variant="h2" style={{color:"white"}}>
        Sign in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box   >
        <TextField
          margin="normal"
         {...register("email")}
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
          {errors.email?<p className='text-primary mt-2'>{errors.email.message}</p>:''}
        <TextField
          margin="normal"
          required
          {...register("password")}
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
          {errors.password?<p className='text-primary mt-2'>{errors.password.message}</p>:''}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Button onClick={handleTest}>Hi</Button>
        {/* <Grid container>
          <Grid item xs={6}> */}
          <Grid  alignItems="center" justify="flex-end">
            <Link href="#" sx={{display:'block'}}   align='center' underline='none' variant="body2">
              Forgot password?
            </Link>
            </Grid>
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          <div>
          {/* <p className='text-danger mt-3 fs-6 mx-auto'>nvnvnbv</p> */}
          </div>
          <Grid>
            <Typography sx={{display:'block', mt:3}}  align='center' variant="h7">
              {/* {"Don't have an account?"}<Link onClick={handleAction} variant='h7' color="primary" style={{cursor:'pointer'}} underline='none'> SignUp</Link> */}
            </Typography>
            </Grid>
          {/* </Grid>
        </Grid> */}
      </Box>
      </form>
    </Box>
    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
  </Container>
</ThemeProvider>
</Grid>
<ToastContainer/>
</div>
  )
}

export default Login