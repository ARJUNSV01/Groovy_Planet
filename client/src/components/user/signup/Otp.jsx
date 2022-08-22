import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import OtpInput from 'react-otp-input';
// import OTPInput, { ResendOTP } from "otp-input-react";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { serverURL } from '../../../serverURL';
// import { serverUrl } from '../../../serverUrl';
// import "./styles.css";

const useStyles = makeStyles((theme) => ({
  grid: {
    backgroundColor: 'grey',
    height: '50vh',
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Otp(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [otp, setOtp] = useState('');
  const [otpErr, setOtpErr] = useState(null);

  const handleVerify = async () => {
    try{
      console.log(props.MobileNumber);
      const res =await axios.post(`${serverURL}/auth/verifyOtp`, { MobileNumber:props.MobileNumber,otp },{withCredentials:true});
      console.log(res);
      if(res.request.status == 200){
        setOtpErr(null)
        props.onChange(otp);
        props.closeOtpModal()
      }
     }catch(err){
      setOtpErr("Invalid OTP")
      console.log(err);
    }
  };

  // let hasFourDigit =/^\d{4}$/.test(otp)

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid
          container
          style={{ backgroundColor: 'white' }}
          className={classes.grid}
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid item container justify='center'>
            <Grid item container alignItems='center' direction='column'>
              <Grid item>
                <Avatar className={classes.avatar}>
                  {/* <LockOutlinedIcon /> */}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography component='h1' variant='h5'>
                  Verification Code
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign='center'>
            <Paper elevation={0}>
              <Typography variant='h6'>
                Please enter the verification code sent to your mobile
              </Typography>
            </Paper>
          </Grid>
          <small style={{color:"red"}}>{otpErr}</small>
          <Grid
            item
            xs={12}
            container
            justify='center'
            alignItems='center'
            direction='column'
          >
            <Grid item spacing={3} justify='center'>
              <OtpInput
                value={otp}
                onChange={(e) => {
                  setOtp(e);
                }}
                separator={
                  <span>
                    <strong>.</strong>
                  </span>
                }
                inputStyle={{
                  width: '3rem',
                  height: '3rem',
                  margin: '0 1rem',
                  fontSize: '2rem',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.3)',
                }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={ handleVerify}
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                // disabled={!hasFourDigit}
              >
                Verify
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}