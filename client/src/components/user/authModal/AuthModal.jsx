import * as React from 'react';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Login from '../login/Login';
import Card from '@mui/material/Card';
import Signup from '../signup/Signup';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundImage:`url(../../../shell.jpg)`  ,  
    bgcolor: '#ed0c66',
    // border: '2px solid #000',
    borderRadius:3,
    boxShadow:24,
    p: 4,
  };

function AuthModal(props) {
  const[action,setAction] = useState(props.action)
  const [open, setOpen] = React.useState(true);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
      props.onChange()
  }
  const handleAction = (prevAction)=>{
    prevAction === 'login' ? setAction('signup') : setAction('login')    
  }
  return (
    <div>
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
 
      <Grid item xs={6}> 
      {/* <Card> */}
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {/* <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          {action === 'login' ? <Login changeAction ={handleAction} /> : <Signup changeAction ={handleAction} closeModal={handleClose}/>}
          {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Fade>
    </Modal>
    {/* </Card> */}
    </Grid>
    
  </div>
  )
}

export default AuthModal