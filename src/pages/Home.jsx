import React from 'react'
import Grid from '@mui/material/Grid';


const Home = () => {
  return (
    <div className='homeContainer'>
      <Grid container className='mthome' spacing={2}>
        <Grid item xs={4}>
          1
        </Grid>
        <Grid item xs={4}>
          2
        </Grid>
        <Grid item xs={4}>
          3
        </Grid>
      </Grid>
    </div>

  )
}

export default Home