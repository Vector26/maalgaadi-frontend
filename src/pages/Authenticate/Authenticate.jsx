import { Button, Card, CardActions, CardContent, Container, IconButton, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react'
import { CONTRAST_TEXT, DARK_PRIMARY, LIGHT_PRIMARY, PRIMARY, PRIMARY_TEXT, SECONDARY_TEXT } from '../../Colors'
import { LoginDriver,LoginDealer, SignupDealer } from '../../Requests';
import CloseIcon from '@mui/icons-material/Close';
import data from '../../data/CS.json';
import './Authenticate.css';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { setAuth,setUser } from '../../actions/auth-actions';
import {SignUpDealer} from './SignUpDealer';
import { Login } from './Login';
import { isDealer } from '../../actions/user-actions';
const Authenticate = () => { 
    const [Role, setRole] = useState(0);
    const [value, setValue] = React.useState(0);
    const [tabs, setTabs] = useState(true);
    console.log("Role",Role);
    console.log("Value",value);
    console.log("Tabs",tabs);
    // console.log(data["Delhi"]);
    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
      };
    return (
      <>
        <Box className="WorkBox" sx={{backgroundColor:LIGHT_PRIMARY}}>
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
            {value===1 && Role===1 && <SignUpDriverr setRole={setRole}/>}
        </Card>
    </Box>
    </>
  )
}





const SignUpDriverr=({setRole})=>{
    return (<>
        <CardContent>
            <Typography variant="h4" align='center' color="text.secondary">
            SIGNUP
            </Typography>
            <Button >Login</Button>
        </CardContent>
        <CardActions>
            <Button onClick={()=>setRole(0)}>
            Already Member? <br/>Login Here
            </Button>
        </CardActions>
    </>);
}

export default Authenticate 