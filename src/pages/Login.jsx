import React, { useState } from 'react'
import {Grid,TextField} from '@mui/material'
import loginimg from '../assets/loginform.jpg'
import googlbtn from '../assets/Google.png'
import RegLogHeading from '../components/RegLogHeading'
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup } from "firebase/auth";

let initialValue = {
  email : "",
  fullName: "",
  password: "",
  loading: false
}

const Login = () => {
  let navigate = useNavigate()
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let [values,setValues]= useState(initialValue)

  let handleChange=(e)=>{
    // console.log(e.target.name)
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
    // console.log(values)
  }

  let handleSubmit = ()=>{
    let {email,fullName,password} = values;
    // console.log(email,fullName,password)
    setValues({
      ...values,
      loading:true
    })

    signInWithEmailAndPassword(auth,email,password).then((user)=>{
      // console.log(user)
      setValues({
        email : "",
        password: "",
        loading:false
      })
      // navigate("/login")
      console.log(user)
    })
  }

  let handleGoggleLogin = ()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
    })
  }
  
  let handleRun =()=>{
    navigate("/")
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={6} className='regflex'>
        <form className='regform'>
          <RegLogHeading className="loghead" tittle="Login to your account!"/>
          <div >
            <div className='googlebtn'><img onClick={handleGoggleLogin}  src={googlbtn} alt="googlbtn" /></div>
          </div>
          <div className='fixregform '>
            <TextField className='textfield' name='email' value={values.email} onChange={handleChange} id="outlined-basic" label="Email Address" type='email' variant="outlined"/>
            <TextField className='textfield' name='password' value={values.password} onChange={handleChange}  id="outlined-basic1" label="Password" type='password' variant="outlined"/>
            
            {
              values.loading 
              ?
              <LoadingButton className='loadbtn' loading variant="outlined">
                Submit
              </LoadingButton>
              :
              <button className='regbtn' onClick={handleSubmit}>Login to Continue</button>
            }
            <p className='link'>Don’t have an account ? <span  onClick={handleRun}>Sign up</span></p>
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