import React, { useState } from 'react'
import {Grid,TextField,Alert} from '@mui/material'
import loginimg from '../assets/loginimg.png'
import RegLogHeading from '../components/RegLogHeading'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate,Link } from 'react-router-dom';
import { RxEyeNone,RxEyeOpen } from "react-icons/rx";

// font-family: 'Nunito', sans-serif;

let initialValue = {
  email : "",
  fullName: "",
  password: "",
  loading: false,
  error: "",
  eye:true
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
    let registrationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let result = registrationRegex.test(values.password)
    console.log(result)
    if(!email){
      setValues({
        ...values,
        error : "Enter an Email"
      })
      return
    }
    if(!fullName){
      setValues({
        ...values,
        error : "Enter a Fullname"
      })
      return
    }
    

    if(!password || !result){
      setValues({
        ...values,
        error : "Enter 8 Character Password. At least One Uppercase Letter , One Lowercase Letter and One number"
      })
      return
    }
    
    // console.log(email,fullName,password)
    setValues({
      ...values,
      loading:true
    })

    createUserWithEmailAndPassword(auth,email,password).then((user)=>{
      console.log(user)
    //   sendEmailVerification(auth.currentUser)
    // .then(() => {
    //   // Email verification sent!
    //   console.log("Verrified")
    // });
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
            <div className='regformmargin'>
              <TextField name='email' value={values.email} onChange={handleChange} className='textfield' id="outlined-basic" label="Email Address" type='email' variant="outlined"/>
              { values.error.includes("Email") && <Alert severity="error">{values.error}</Alert>}
            </div>
            <div className='regformmargin'>
              <TextField name='fullName' value={values.fullName} onChange={handleChange} className='textfield' id="outlined-basic" label="Full name" variant="outlined" />
              { values.error.includes("Fullname") && <Alert severity="error">{values.error}</Alert>}
            </div>
            <div className='regformmargin'>
              <TextField name='password' value={values.password} onChange={handleChange} className='textfield' id="outlined-basic" label="Password" type={values.eye ? 'password' : 'text'} variant="outlined"/>
              <div className='regeye' onClick={()=>{setValues({
                ...values,
                eye: ! values.eye
              })}}>
              {
                values.eye ?
                <RxEyeNone/>
                :
                <RxEyeOpen/>

              }
              </div>
              
              { values.error.includes("Password") && <Alert severity="error">{values.error}</Alert>}
            </div>

            {
              values.loading 
              ?
              <LoadingButton className='loadbtn' loading variant="outlined">
                Submit
              </LoadingButton>
              :
              <button onClick={handleSubmit} className='regbtn'>Submit</button>
              
            }
            <p className='link link2' >Already  have an account ? <span onClick={handleRun}>Sign In</span></p>
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