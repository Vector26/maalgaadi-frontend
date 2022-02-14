import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import './Home.css'
import bg from '../../media/bg2.png'
import truck from '../../media/truck.png'

import { ACCENT, CONTRAST_TEXT, DARK_PRIMARY, LIGHT_PRIMARY, PRIMARY, PRIMARY_TEXT } from '../../Colors'

const Home = () => {
  // console.log(bg);
  return (
    <>
      <Box className="jumbotron" sx={{color:DARK_PRIMARY,backgroundImage:`url(${bg})`,backgroundSize:'100% 100%'}}>
        <Box className="title" sx={{flex:1.5,alignItems:'center',justifyContent:'center'}}>
        <Typography variant="h2" sx={{color:CONTRAST_TEXT,backgroundColor:PRIMARY,padding:'1em',marginTop:'1em',borderRadius:'1em 5em 5em 1em'}}>Find the perfect transport for your <span style={{fontFamily:'Impact !important'}}>goods</span>
        <br/>
        <br/>
        <Button onClick={()=>{window.location='/authenticate'}} variant="contained" sx={{backgroundColor:ACCENT,padding:'1em'}}>Get Started</Button>
        </Typography>
        </Box>
        <Box sx={{flex:2,alignItems:'center',paddingTop:'2em',display:{xs:'none',md:'none',lg:'flex'}}}> 
          <img src={truck}/>
        </Box>
      </Box>
    </>
  )
}

export default Home