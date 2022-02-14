import { Button, Card, CardActions, CardContent, Container, IconButton, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { LoginDriver,LoginDealer, SignupDealer, GetOTP, LoginDealerOTP, LoginDriverOTP } from '../../Requests';
import './Authenticate.css';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch } from 'react-redux';
import { setAuth, setUser } from '../../actions/auth-actions';
import { isDealer } from '../../actions/user-actions';
const DRIVER="driver";
const DEALER="dealer";

export const Login=({tabs,setTabs,role,value,setRole})=>{
    let dispatch=useDispatch();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [isError, setisError] = useState(false);
    const [OTP, setOTP] = useState(0);
    var ErrorMessage=useRef();
    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const sendOTP=()=>{
        GetOTP(Username)
        .then((res)=>{
            console.log(res);
            ErrorMessage.current=res.data;
            setisError(true);
        })
        .catch((e)=>{
            console.log(e.toString());
            ErrorMessage.current="Invalid User";
            setisError(true);
        })
    }
    const invalidLogin=()=>{
        ErrorMessage.current="Invalid Login";
        setisError(true);
    }
    const login=async ()=>{
        let is_dealer=(value===0);
        let res={};
        try
        {
            if(!is_dealer){
            if(tabs)
                res= await LoginDriver({"username": Username,"password": Password});
            else
                res=await LoginDriverOTP({"username": Username, "otp": parseInt(OTP)});
            }
            else{
                if(tabs)
                    res = await LoginDealer({"username": Username,"password": Password})
                else
                    res = await LoginDealerOTP({"username": Username,"otp": parseInt(OTP)})
            }
        }
        catch(e){
            invalidLogin();
            console.error(e);
        }
        PostAuthenticate(is_dealer,res);
    }

    const action=(<IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>setisError(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>)

    const snacc=(
        <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={()=>setisError(false)}
        message={ErrorMessage.current}
        action={action}
        />
        )
        
    const PostAuthenticate=(isDEALER,res)=>{
        dispatch(isDealer(isDEALER));
        if(isDEALER){
            if(res.data[DEALER]!=null)
                dispatch(setUser(res.data[DEALER]));
            else{
                invalidLogin();
                return
            }
        }
        else{
            if(res.data[DRIVER]!=null)
                dispatch(setUser(res.data[DRIVER]));
            else{
                invalidLogin();
                return
            }
        }
        dispatch(setAuth(true));
    }

    const OTPComponent=(
            <>
            <CardContent>
                <Typography variant="h4" color="text.secondary">
                LOGIN
                </Typography>
                <Container className="AuthBox2">
                    <TextField onChange={handleUsernameChange} placeholder="Username" />
                    <Button id="CA" onClick={sendOTP}>Send OTP</Button>
                    <TextField type="password" onChange={(e)=>setOTP(e.target.value)} placeholder="OTP" />
                </Container>
                <Button id="CA" onClick={login}>VALIDATE OTP</Button>
            </CardContent>
            <CardActions>
                <Button onClick={()=>{setRole(1);setTabs(true);}}>
                New Here? <br/>Register Here
                </Button>
                <Button onClick={()=>setTabs(true)}>Login With Password?</Button>
            </CardActions>
            {snacc}
            </>
        );

    const PasswordComponent=(<>
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
            <Button onClick={()=>setTabs(false)}>Login With OTP?</Button>
        </CardActions>
        {snacc}
    </>);

    return (tabs ? PasswordComponent:OTPComponent);
}
