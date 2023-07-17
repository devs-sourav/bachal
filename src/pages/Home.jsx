import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    let navigate = useNavigate()
    const auth = getAuth();

    let handleLogOut = ()=>{
        signOut(auth).then(() => {
           
            navigate("/login")

          }).catch((error) => {
            // An error happened.
          });
    }

  return (
    <button onClick={handleLogOut} variant="contained">Logout</button>
  )
}

export default Home