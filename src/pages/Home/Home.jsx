import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ActionBox } from '../../Components/Navigation/Navigation'
import './Home.css'
import bg from '../../media/bg.jpg'
import { PRIMARY, PRIMARY_TEXT } from '../../Colors'

const Home = () => {
  // console.log(bg);
  return (
    <>
    <ActionBox>
    <Box className="jumbotron" sx={{}}>
        <Box className="title" sx={{backgroundImage:`url(${bg})`,padding:'1em',flex:'1'}}>
        <Typography variant="h2" sx={{fontWeight:'bold',fontSize:'5em',color:'white',margin:'1em',color:PRIMARY_TEXT}}>
          Transport your <br/> Goods
        </Typography>
        </Box>
      </Box>
    </ActionBox>
    </>
  )
}

export default Home

      {/* <Box className="jumbotron" sx={{}}>
        <Box className="title" sx={{backgroundColor:'rgba(200,200,200,0.3)',padding:'1em',flex:'1'}}>
        <Typography variant="h2" sx={{fontWeight:'bold',fontSize:'5em',color:'white',margin:'1em',color:'black'}}>
          Transport your <br/> Goods
        </Typography>
        </Box>
        <Box className="title" sx={{backgroundColor:'rgba(200,200,200,0.3)',padding:'1em',flex:'1'}}>
          <Box sx={{width:'90%',backgroundImage:`url(${bg})`,borderRadius:'2em',backgroundPosition:'bottom',backgroundSize:'contain',backgroundRepeat:'no-repeat'}}/>
        </Box>
      </Box> */}