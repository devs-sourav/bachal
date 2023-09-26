import React from 'react'
import Grid from '@mui/material/Grid';
// import Group from '../components/Group';
import Friends from '../components/Friends';
import ChatBox from '../components/ChatBox'
import MsgGroup from '../components/MsgGroup';

const Message = () => {
  return (
    <div className='message'>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className='grp_container2'>
                <MsgGroup/>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Friends type="msg"/>
            </Grid>
          </Grid>
          </div>
        </Grid>
        <Grid item xs={8}>
          <ChatBox/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Message