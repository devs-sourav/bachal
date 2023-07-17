import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const ForgetPassword = () => {

  const auth = getAuth();
  let [email, setEmail] = useState('');
  let navigate = useNavigate()

 

  let handleSubmit = () => {
    console.log(email)
    sendPasswordResetEmail(auth, email)
    .then(() => {
      navigate("/login")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  };



  return (
    <div className="forget-password-container">
      <h2>Forget Password</h2>
      <div>
        <TextField type='email' id="outlined-basic" onChange={(e)=>{setEmail(e.target.value)}} label="Email" variant="outlined" />
        <button  onClick={handleSubmit} type="submit">Submit</button>
      </div>
    </div>
  )
}

export default ForgetPassword