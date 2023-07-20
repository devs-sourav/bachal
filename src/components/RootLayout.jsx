import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profilePic from '../assets/profile.png'
import { AiOutlineHome, AiFillSetting } from "react-icons/ai";
import { BsChatDotsFill, BsFillBellFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Link,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const RootLayout = () => {
    let path = useLocation()
    console.log(path.pathname)
    let notify = (msg) => toast.success(msg +" ", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }) ;

    let navigate = useNavigate()
    const auth = getAuth();

    let handleLogOut = ()=>{
        signOut(auth).then(() => {
           
            navigate("/login")
            notify("Logout Successful");
            localStorage.removeItem("user")

          }).catch((error) => {
            // An error happened.
          });
    }


  return (
    <>
        <Grid container spacing={2}>
            <Grid item xs={1.5}>
                <div className='navbar'>
                    <div className='nav_container'>
                       <div className='img_div_profile'>
                            <Link to='/bachal/profile'><img src={profilePic}/></Link>
                            
                       </div>
                        <ul className='nav_menu'>
                            <li  className={path.pathname=='/bachal/home' ? 'active' : 'menu_icon'}><Link to='/bachal/home'> <AiOutlineHome/> </Link></li>
                            <li  className={path.pathname=='/bachal/message' ? 'active' : 'menu_icon'}><Link to='/bachal/message'> <BsChatDotsFill/></Link></li>
                            <li  className={path.pathname=='/bachal/notification' ? 'active' : 'menu_icon'}><Link to='/bachal/notification'> <BsFillBellFill/></Link> </li>
                            <li className={path.pathname=='/bachal/settings' ? 'active' : 'menu_icon'}><Link to='/bachal/settings'> <AiFillSetting/> </Link></li>
                        </ul>

                        <ul  className='nav_menu_exit'>
                            <li><ImExit onClick={handleLogOut}/> </li>
                        </ul>
                    </div>
                </div>
            </Grid>
            <Grid item xs={10.5}>
                <Outlet/>
            </Grid>
        </Grid>
        
    </>
  )
}

export default RootLayout