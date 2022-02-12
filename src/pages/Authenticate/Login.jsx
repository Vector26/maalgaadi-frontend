import { Button, Card, CardActions, CardContent, Container, IconButton, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { LoginDriver,LoginDealer, SignupDealer } from '../../Requests';
import './Authenticate.css';

export const Login=({role,setRole})=>{
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const login=()=>{
        role==0?(
            LoginDealer({Username,Password})
            .then((res)=>{
                // 
            })
            .catch((e)=>{
                console.error(e);
            })
        ):(
            LoginDriver({Username,Password})
            .then((res)=>{
                // 
            })
            .catch((e)=>{
                console.error(e);
            })
        )
    }
    return (<>
        <CardContent>
            <Typography variant="h4" color="text.secondary">
            LOGIN
            </Typography>
            <Container className="AuthBox2">
                <TextField onChange={handleUsernameChange} placeholder="Username" />
                <TextField type="password" onChange={handlePasswordChange} placeholder="Password" />
            </Container>
            <Button id="CA" onClick={login}>Login</Button>
        </CardContent>
        <CardActions>
            <Button onClick={()=>setRole(1)}>
            New Here? <br/>Register Here
            </Button>
            <Button >Login With OTP?</Button>
        </CardActions>
    </>);
}