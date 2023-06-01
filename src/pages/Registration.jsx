import React from 'react'
import {Grid,TextField} from '@mui/material'
import loginimg from '../assets/loginimg.png'
import RegLogHeading from '../components/RegLogHeading'
// font-family: 'Nunito', sans-serif;
const Registration = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} className='regflex'>
        <form className='regform'>
          <RegLogHeading className="regloghead" tittle="Get started with easily register"/>
          <p>Free register and you can enjoy it</p>
          <div className='fixregform'>
            <TextField className='textfield' id="outlined-basic" label="Email Address" type='email' variant="outlined"/>
            <TextField className='textfield' id="outlined-basic" label="Full name" variant="outlined" />
            <TextField className='textfield' id="outlined-basic" label="Password" type='password' variant="outlined"/>
            <button>Submit</button>
            <a className='link link2' href='#'>Already  have an account ? <span>Sign In</span></a>
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

export default Registration