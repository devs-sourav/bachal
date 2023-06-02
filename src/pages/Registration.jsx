import React, { useState } from 'react'
import {Grid,TextField} from '@mui/material'
import loginimg from '../assets/loginimg.png'
import RegLogHeading from '../components/RegLogHeading'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';

// font-family: 'Nunito', sans-serif;

let initialValue = {
  email : "",
  fullName: "",
  password: "",
  loading: false
}

const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate()


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

    createUserWithEmailAndPassword(auth,email,password).then((user)=>{
      // console.log(user)
      setValues({
        email : "",
        fullName: "",
        password: "",
        loading:false
      })
      navigate("/login")
    })
  }

  let handleRun =()=>{
    navigate("/login")
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={6} className='regflex'>
        <div className='regform'>
          <RegLogHeading className="regloghead" tittle="Get started with easily register"/>
          <p>Free register and you can enjoy it</p>
          <div className='fixregform'>
            <TextField name='email' value={values.email} onChange={handleChange} className='textfield' id="outlined-basic" label="Email Address" type='email' variant="outlined"/>
            <TextField name='fullName' value={values.fullName} onChange={handleChange} className='textfield' id="outlined-basic" label="Full name" variant="outlined" />
            <TextField name='password' value={values.password} onChange={handleChange} className='textfield' id="outlined-basic" label="Password" type='password' variant="outlined"/>

            {
              values.loading 
              ?
              <LoadingButton className='loadbtn' loading variant="outlined">
                Submit
              </LoadingButton>
              :
              <button className='regbtn' onClick={handleSubmit}>Submit</button>
            }
            

            
            <a className='link link2' onClick={handleRun} href='#'>Already  have an account ? <span>Sign In</span></a>
          </div>
        </div>
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