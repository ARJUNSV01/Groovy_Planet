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
import {useForm} from "react-hook-form";
import axios from 'axios';
import { serverURL } from '../../serverURL';

const theme = createTheme();


function Login(props) {
    const{register,handleSubmit} = useForm()
    const onSubmit = (data) => {
        axios.post(`${serverURL}/auth/login`,data).then((response)=>{
            console.log(response.data,'data');
        }).catch((err)=>{
          console.log(err.response.data.message,'err');
        })
      };
      const handleAction = ()=>{
          props.changeAction('login')
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
          {/* <Grid container>
            <Grid item xs={6}> */}
            <Grid  alignItems="center" justify="flex-end">
              <Link href="#" sx={{display:'block'}}   align='center' underline='none' variant="body2">
                Forgot password?
              </Link>
              </Grid>
            {/* </Grid> */}
            {/* <Grid item xs={6}> */}
            <Grid>
              <Typography sx={{display:'block', mt:3}}  align='center' variant="h7">
                {"Don't have an account?"}<Link onClick={handleAction} variant='h7' color="primary" style={{cursor:'pointer'}} underline='none'> SignUp</Link>
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
  </div>
  )
}

export default Login