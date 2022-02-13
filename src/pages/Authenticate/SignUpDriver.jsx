import { Button, Card, CardActions, CardContent, Container, IconButton, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react'
import { LoginDriver,LoginDealer, SignupDealer, SignupDriver } from '../../Requests';
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

export const SignUpDriver=({setRole})=>{
    let dispatch=useDispatch();
    const form=useRef();
    const [Username, setUsername] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [ Age, setAge] = useState("");
    const [TruckNumber, setTruckNumber] = useState("");
    const [TruckCapacity, setTruckCapacity] = useState(0);
    const [TransporterName, setTransporterName] = useState("");
    const [DrivingExperience, setDrivingExperience] = useState(0);

    const [State11, setState11] = useState("Choose State");
    const [City11, setCity11] = useState("Choose City");
    
    const [State12, setState12] = useState("Choose State");
    const [City12, setCity12] = useState("Choose City");
    
    const [State21, setState21] = useState("Choose State");
    const [City21, setCity21] = useState("Choose City");
    
    const [State22, setState22] = useState("Choose State");
    const [City22, setCity22] = useState("Choose City");
    
    const [State31, setState31] = useState("Choose State");
    const [City31, setCity31] = useState("Choose City");
    
    const [State32, setState32] = useState("Choose State");
    const [City32, setCity32] = useState("Choose City");
    
    const [CPW, setCPW] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    // console.log("City",City);
    const onSubmit=(e)=>{
        if(Password===ConfirmPassword)
            {SignupDriver({
                "username": Username,
                "name": Name,
                "email": Email,
                "mobileNumber": Mobile,
                "password": Password,
                "age": Age,
                "truckNumber": TruckNumber,
                "truckCapacity": TruckCapacity,
                "transporterName": TransporterName,
                "drivingExperience": DrivingExperience,
                "interestedRoutes": [
                    {
                        "fromCity": City11,
                        "fromState": State11,
                        "toCity": City12,
                        "toState": State12
                    },
                    {
                        "fromCity": City21,
                        "fromState": State21,
                        "toCity": City22,
                        "toState": State22
                    },
                    {
                        "fromCity": City31,
                        "fromState": State31,
                        "toCity": City32,
                        "toState": State32
                    }
                ]
            })
            .then((res)=>{
                PostAuthenticate(false,res);
            })
            .catch((e)=>{
                if(e.response&&e.response.data){
                    let error=e.response.data[Object.keys(e.response.data)[0]];
                    setErrorMessage(error);
                    setCPW(true); 
                }
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
            <TextField required id="NM" variant="outlined" label=" Age" placeholder=' Age'
            value={ Age} onChange={e => setAge(e.target.value)}/>
            <TextField required id="WE" variant="outlined" label="TruckNumber" placeholder='TruckNumber'
            value={TruckNumber} onChange={e => setTruckNumber(e.target.value)}/>
            <TextField type="number" required id="WE" variant="outlined" label="Truck Capacity" placeholder='Truck Capacity'
            value={TruckCapacity} onChange={e => setTruckCapacity(e.target.value)}/>
            <TextField required id="WE" variant="outlined" label="Transporter Name" placeholder='Transporter Name'
            value={TransporterName} onChange={e => setTransporterName(e.target.value)}/>
            <TextField type="number" required id="WE" variant="outlined" label="Driving Experience" placeholder='Driving Experience'
            value={DrivingExperience} onChange={e => setDrivingExperience(e.target.value)}/>
            
            <Box className="selector">
            <Typography sx={{paddingLeft:'1.5em'}} align='left'>Route 1</Typography>
            <Typography sx={{paddingLeft:'1.5em'}} variant="caption2">From</Typography>
            <Select
                fullWidth
                value={State11}
                label="State"
                onChange={(e)=>setState11(e.target.value)}>
                    {Object.keys(data).map((State,k)=>{
                        return <MenuItem key={k} value={State}>{State}</MenuItem>
                    })}
            </Select>
            <Select
                fullWidth
                value={City11}
                label="City"
                placeholder='City'
                defaultValue="Select City"
                onChange={(e)=>setCity11(e.target.value)}>
                    {data[State11].map((city,k)=>{
                        return <MenuItem key={k} sx={{color:'black'}} value={city}>{city}</MenuItem>
                    })}
            </Select>
            <br/>
            <Typography sx={{paddingLeft:'1.5em'}} variant="subtitle">To</Typography>
            <br/>
            <Select
                fullWidth
                value={State12}
                label="State"
                onChange={(e)=>setState12(e.target.value)}>
                    {Object.keys(data).map((State,k)=>{
                        return <MenuItem key={k} value={State}>{State}</MenuItem>
                    })}
            </Select>
            <Select
                fullWidth
                value={City12}
                label="City"
                placeholder='City'
                defaultValue={State12[0]}
                onChange={(e)=>setCity12(e.target.value)}>
                    {data[State12].map((city,k)=>{
                        return <MenuItem key={k} sx={{color:'black'}} value={city}>{city}</MenuItem>
                    })}
            </Select>
            </Box>
            <Box className="selector">
            <Typography sx={{paddingLeft:'1.5em'}} align='left'>Route 2</Typography>
            <Typography sx={{paddingLeft:'1.5em'}} variant="caption2">From</Typography>
            <Select
                fullWidth
                value={State21}
                label="State"
                onChange={(e)=>setState21(e.target.value)}>
                    {Object.keys(data).map((State,k)=>{
                        return <MenuItem key={k} value={State}>{State}</MenuItem>
                    })}
            </Select>
            <Select
                fullWidth
                value={City21}
                label="City"
                placeholder='City'
                defaultValue={State21[0]}
                onChange={(e)=>setCity21(e.target.value)}>
                    {data[State21].map((city,k)=>{
                        return <MenuItem key={k} sx={{color:'black'}} value={city}>{city}</MenuItem>
                    })}
            </Select>
            <br/>
            <Typography sx={{paddingLeft:'1.5em'}} variant="subtitle">To</Typography>
            <br/>
            <Select
                fullWidth
                value={State22}
                label="State"
                onChange={(e)=>setState22(e.target.value)}>
                    {Object.keys(data).map((State,k)=>{
                        return <MenuItem key={k} value={State}>{State}</MenuItem>
                    })}
            </Select>
            <Select
                fullWidth
                value={City22}
                label="City"
                placeholder='City'
                defaultValue={State22[0]}
                onChange={(e)=>setCity22(e.target.value)}>
                    {data[State22].map((city,k)=>{
                        return <MenuItem key={k} sx={{color:'black'}} value={city}>{city}</MenuItem>
                    })}
            </Select>
            </Box>
            <Box className="selector">
            <Typography sx={{paddingLeft:'1.5em'}} align='left'>Route 3</Typography>
            <Typography sx={{paddingLeft:'1.5em'}} variant="caption2">From</Typography>
            <Select
                fullWidth
                value={State31}
                label="State"
                onChange={(e)=>setState31(e.target.value)}>
                    {Object.keys(data).map((State,k)=>{
                        return <MenuItem key={k} value={State}>{State}</MenuItem>
                    })}
            </Select>
            <Select
                fullWidth
                value={City31}
                label="City"
                placeholder='City'
                defaultValue={State31[0]}
                onChange={(e)=>setCity31(e.target.value)}>
                    {data[State31].map((city,k)=>{
                        return <MenuItem key={k} sx={{color:'black'}} value={city}>{city}</MenuItem>
                    })}
            </Select>
            <br/>
            <Typography sx={{paddingLeft:'1.5em'}} variant="subtitle">To</Typography>
            <br/>
            <Select
                fullWidth
                value={State32}
                label="State"
                onChange={(e)=>setState32(e.target.value)}>
                    {Object.keys(data).map((State,k)=>{
                        return <MenuItem key={k} value={State}>{State}</MenuItem>
                    })}
            </Select>
            <Select
                fullWidth
                value={City32}
                label="City"
                placeholder='City'
                defaultValue={State32[0]}
                onChange={(e)=>setCity32(e.target.value)}>
                    {data[State32].map((city,k)=>{
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

export default SignUpDriver;