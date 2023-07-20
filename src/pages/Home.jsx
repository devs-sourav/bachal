import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Search from '../components/Search';
import Group from '../components/Group';
import Friends from '../components/Friends';
import UserList from '../components/UserList';
import FriendRequest from '../components/FriendRequest';
import Block from '../components/Block';
import MyGroup from '../components/MyGroup';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  let loginUser = useSelector((state)=>state.loggedUser.loginUser)
  let navigate = useNavigate()
  useEffect(()=>{
    if(loginUser==null){
      navigate("/login")
    }
  },[])

  


  return (
    <div className='homeContainer'>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Search/>
          <Group/>
        </Grid>
        <Grid item xs={4}>
          <Friends/> 
        </Grid>
        <Grid item xs={4}>
          <UserList/>
        </Grid>
        <Grid item xs={4}>
          <FriendRequest/>
        </Grid>
        <Grid item xs={4}>
          <MyGroup/> 
        </Grid>
        <Grid item xs={4}>
          <Block/>
        </Grid>
      </Grid>
    </div>

  )
}

export default Home