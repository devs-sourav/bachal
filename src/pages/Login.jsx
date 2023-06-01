import React from 'react'
import {Grid,TextField} from '@mui/material'
import loginimg from '../assets/loginform.jpg'
import googlbtn from '../assets/Google.png'
import RegLogHeading from '../components/RegLogHeading'

const Login = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} className='regflex'>
        <form className='regform'>
          <RegLogHeading className="loghead" tittle="Login to your account!"/>
          <div >
            <a href='#' className='googlebtn'><img  src={googlbtn} alt="googlbtn" /></a>
          </div>
          <div className='fixregform '>
            <TextField className='textfield' id="outlined-basic" label="Email Address" type='email' variant="outlined"/>
            <TextField className='textfield' id="outlined-basic" label="Password" type='password' variant="outlined"/>
            <button>Login to Continue</button>
            <a className='link' href='#'>Don’t have an account ? <span>Sign up</span></a>
          </div>
        </form>
      </Grid>
      <Grid item xs={6}>
        <div className='w-100'>
          <img className='resizeimg' src={loginimg}/>
        </div>
      </Grid>
    </Grid>
  )
}

export default Login