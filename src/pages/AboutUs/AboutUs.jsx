import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'

const AboutUs = () => {
  return (
    <Box sx={{display:'flex',width:'100%',minHeight:'100%',justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
        <Person sx={{maxWidth:'20em',margin:'1em',height:'26em'}} Name="Hritik Rai" pfp="https://avatars.githubusercontent.com/u/23053807?v=4" url="https://github.com/Vector26">
            <Typography variant="body">
            I am a freshie elastic developer and a quick learner of new tech stacks.I am very proficient in responsive front-end development.
              </Typography>
        </Person>
        <Person sx={{maxWidth:'20em',margin:'1em',height:'26em'}} Name="Dev Pratap Tyagi" pfp="https://avatars.githubusercontent.com/u/56474716?v=4" url="https://github.com/devptyagi">
            <Typography variant="body">
            👨🏻‍🎓 3rd Year B.Tech Student.
            💻 Computer Science Major.
            📱 Android Developer.
            🖥 Backend Developer.
            ☕️ Java - Spring Boot Developer.
              </Typography>
        </Person>
    </Box>
  )
}

const Person=({sx,Name,pfp,children,url})=>{
    return(
    <Card sx={sx}>
        <CardContent><Typography>{Name}</Typography></CardContent>        
        <CardContent><img style={{borderRadius:'51%'}} height='150em' src={pfp}/></CardContent>        
        <CardContent>{children}</CardContent>
        <CardActions><Button onClick={()=>{window.location=url}}>Learn more</Button></CardActions>        
    </Card>
    )
}

export default AboutUs