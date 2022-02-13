import { Button, Card, CardActions, CardContent, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { CONTRAST_TEXT,LIGHT_PRIMARY} from '../../Colors'
import './Authenticate.css';
import {SignUpDealer} from './SignUpDealer';
import { Login } from './Login';
import SignUpDriver from './SignUpDriver';
const Authenticate = () => { 
    const [Role, setRole] = useState(0);
    const [value, setValue] = React.useState(0);
    const [tabs, setTabs] = useState(true);
    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
      };
    return (
      <>
        <Box className="WorkBox">
        {tabs && <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        >
            <Tab value={0} label="Dealer" />
            <Tab value={1} label="Driver" />
        </Tabs>}
        <Card className="AuthBox" sx={{maxWidth:320,backgroundColor:CONTRAST_TEXT}}>
            {value===0 && Role===0 && <Login tabs={tabs} value={value} setTabs={setTabs} role={Role} setRole={setRole}/>}
            {value===0 && Role===1 && <SignUpDealer setRole={setRole}/>}
            {value===1 && Role===0 && <Login tabs={tabs} setTabs={setTabs} value={value} role={Role} setRole={setRole}/>}
            {value===1 && Role===1 && <SignUpDriver setRole={setRole}/>}
        </Card>
    </Box>
    </>
  )
}

export default Authenticate 