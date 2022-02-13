import { Button, Card, CardActions, CardContent, Container, IconButton, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react'
import { LoginDriver,LoginDealer, SignupDealer } from '../../Requests';
import CloseIcon from '@mui/icons-material/Close';
import data from '../../data/CS.json';
import './Authenticate.css';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { setAuth, setUser } from '../../actions/auth-actions';
import { isDealer } from '../../actions/user-actions';
const DRIVER="driver";
const DEALER="dealer";

export const SignUpDealer=({setRole})=>{
    let dispatch=useDispatch();
    const form=useRef();
    const [Username, setUsername] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Nature, setNature] = useState("");
    const [Weight, setWeight] = useState(0);
    const [Quantity, setQuantity] = useState(0);
    const [State, setState] = useState("Choose State");
    const [City, setCity] = useState("Choose City");
    const [CPW, setCPW] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    console.log("City",City);
    const onSubmit=(e)=>{
        if(Password===ConfirmPassword)
            {SignupDealer({
                "username": Username,
                "name": Name,
                "email": Email,
                "mobileNumber": Mobile,
                "password": Password,
                "natureOfMaterial": Nature,
                "weightOfMaterial": Weight,
                "quantity": Quantity,
                "city": City,
                "state": State
            })
            .then((res)=>{
                PostAuthenticate(true,res);
            })
            .catch((e)=>{

            })
        }
        else{
            setErrorMessage("Passwords Dont Match");
            setCPW(true);
        }

        console.log(e);

    }
    
    const PostAuthenticate=(isDEALER,res)=>{
        dispatch(isDealer(isDEALER));
        if(isDEALER){
            dispatch(setUser(res.data[DEALER]));
        }
        else{
            dispatch(setUser(res.data[DRIVER]));
        }
        dispatch(setAuth(true));
    }
    const action=(<IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>setCPW(false)}
        >
        <CloseIcon fontSize="small" />
      </IconButton>)

    return (<>
        <CardContent>
            <Typography variant="h4" color="text.secondary">
            SIGNUP
            </Typography>
            <form ref={form} onSubmit={onSubmit}>
            <Box className="AuthBox2">
            <TextField required id="UN" variant="outlined" label="Username" placeholder='Username'
            value={Username} onChange={e => setUsername(e.target.value)}/>
            <TextField required id="NA" variant="outlined" label="Name" placeholder='Name'
            value={Name} onChange={e => setName(e.target.value)}/>
            <TextField required id="EM" variant="outlined" label="Email" placeholder='Email'
            value={Email} onChange={e => setEmail(e.target.value)}/>
            <TextField required id="MO" variant="outlined" label="Mobile" placeholder='Mobile'
            value={Mobile} onChange={e => setMobile(e.target.value)}/>
            <TextField required type="password" id="PA1" variant="outlined" label="Password" placeholder='Password'
            value={Password} onChange={e => setPassword(e.target.value)}/>
            <TextField required type="password" id="PA2" variant="outlined" label="Confirm Password" placeholder='Confirm Password'
            value={ConfirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            <TextField required id="NM" variant="outlined" label="Nature" placeholder='Nature'
            value={Nature} onChange={e => setNature(e.target.value)}/>
            <TextField type="number" required id="WE" variant="outlined" label="Weight" placeholder='Weight'
            value={Weight} onChange={e => setWeight(e.target.value)}/>
            <TextField type="number" required id="WE" variant="outlined" label="Quantity" placeholder='Quanity'
            value={Quantity} onChange={e => setQuantity(e.target.value)}/>
            <Box className="selector">
            <Select
                fullWidth
                value={State}
                label="State"
                onChange={(e)=>setState(e.target.value)}>
                    {Object.keys(data).map((State,k)=>{
                        return <MenuItem key={k} value={State}>{State}</MenuItem>
                    })}
            </Select>
            <Select
                fullWidth
                value={City}
                label="City"
                placeholder='City'
                defaultValue={State[0]}
                onChange={(e)=>setCity(e.target.value)}>
                    {data[State].map((city,k)=>{
                        return <MenuItem key={k} sx={{color:'black'}} value={city}>{city}</MenuItem>
                    })}
            </Select>
            </Box>
            </Box>
            <Button onClick={onSubmit} id="CA">Sign Up</Button>
            </form>
        </CardContent>
        <CardActions>
            <Button onClick={()=>setRole(0)}>
            Already Member? <br/>Login Here
            </Button>
        </CardActions>
        <Snackbar
        open={CPW}
        autoHideDuration={6000}
        onClose={()=>setCPW(false)}
        message={ErrorMessage}
        action={action}
        />
    </>);
}

export default SignUpDealer;