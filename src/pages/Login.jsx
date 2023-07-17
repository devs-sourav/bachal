import React, { useState } from 'react'
import {Grid,TextField,Alert} from '@mui/material'
import loginimg from '../assets/loginform.jpg'
import googlbtn from '../assets/Google.png'
import RegLogHeading from '../components/RegLogHeading'
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxEyeNone,RxEyeOpen } from "react-icons/rx";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup } from "firebase/auth";

let initialValue = {
  email : "",
  fullName: "",
  password: "",
  error: "",
  loading: false,
  eye:true,
}

const Login = () => {
  let notify = (msg) => toast("🦄 " + msg);
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
    let {email,password} = values;
    // console.log(email,fullName,password)
    
    if(!email){
      setValues({
        ...values,
        error : "Enter an Email"
      })
      
      return
    }
    if(!password){
      setValues({
        ...values,
        error : "Enter a Password"
      })
      return
    }

    setValues({
      ...values,
      loading:true
    })

    signInWithEmailAndPassword(auth,email,password).then((user)=>{
      // console.log(user)
      setValues({
        email : "",
        password: "",
        loading:false,
      })
      // navigate("/login")
      navigate("/home")
      console.log(user)
    }).catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(errorCode)
      notify(errorCode);

      if(errorCode == 'auth/wrong-password'){
        setValues({
          ...values,
          password:"",
          error: "Wrong Password",
          loading:false,
        })
      }if((errorCode == 'auth/user-not-found')||(errorCode =="auth/invalid-email")){
        setValues({
          ...values,
          email:"",
          error: "Invalid User Email",
          loading:false,
        })
      }

    });
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
        <div className='regform'>
          <RegLogHeading className="loghead" tittle="Login to your account!"/>
          <div >
            <div className='googlebtn'><img onClick={handleGoggleLogin}  src={googlbtn} alt="googlbtn" /></div>
          </div>
          <div className='fixregform '>
            <div className='regformmargin'>
              <TextField className='textfield ' name='email' value={values.email} onChange={handleChange} id="outlined-basic" label="Email Address" type='email' variant="outlined"/>
              { (values.error.includes("Email") || values.error.includes("auth/user-not-found") )&& <Alert severity="error">{values.error}</Alert>}
            </div>
            <div className='regformmargin'>
              <TextField className='textfield' name='password' value={values.password} onChange={handleChange}  id="outlined-basic1" label="Password" type={values.eye ? 'password' : 'text'} variant="outlined"/>
              { (values.error.includes("Password") || values.error.includes("auth/wrong-password") ) && <Alert severity="error">{values.error}</Alert>}
              <div className='regeye' onClick={()=>{setValues({
                ...values,
                eye: !values.eye
              })}}>
              {
                values.eye ?
                <RxEyeNone/>
                :
                <RxEyeOpen/>

              }
              </div>
              
            </div>

            
            {
              values.loading 
              ?
              <LoadingButton className='loadbtn' loading variant="outlined">
                Submit
              </LoadingButton>
              :
              <>
                <button className='regbtn' onClick={handleSubmit}>Login to Continue</button>
                {/* <button variant='contained' onClick={}>Error Show</button> */}
              </>

            }
            <Alert className='forgotbtn' severity="info">Forget Password <span className='fotgotlink ' onClick={()=>{
              navigate("/forgotpassword")
            }}>Click Here</span></Alert>
            <p className='link'>Don’t have an account ? <span  onClick={handleRun}>Sign up</span></p>
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

export default Login