import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography,Button, IconButton } from '@mui/material'
import React, { useRef ,useState} from 'react'
import { useSelector } from 'react-redux'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { BookDriver } from '../../Requests';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import { ACCENT } from '../../Colors';

export const BD = ({index,onClose,open}) => {
    let driver=useSelector(state=>state.User.Feed[index]);
    let dealer=useSelector(state=>state.Auth.user.dealerId);
    var error=useRef();
    const [isError, setisError] = useState(false)
    let today=new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let Today = dd + '-' + mm + '-' + yyyy;
    const BookRide=async (fC,tC)=>{
        let res=await BookDriver({
            "driverId": driver.driverId,
            "dealerId": dealer,
            "bookingDate": Today,
            "fromCity": fC,
            "toCity": tC
        });
        onClose();
        console.log(res);
        error.current=`Your Truck Driver has been booked on ${res.data.bookedOn}`;
        setisError(true);
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
        message={error.current}
        action={action}
        />
        )
    console.log();

    // console.log(driver);
    return (
     <>
      {snacc}
      <Dialog
        sx={{width:'100%'}}
        onClose={onClose}
        open={open}
        >   
          <Container sx={{padding:'1em'}}>
          <DialogTitle><Typography variant="body">Name:{driver.user.name}</Typography></DialogTitle>
          <DialogContent>
                <Typography color="text.secondary">Mobile No.:{driver.user.mobileNumber}</Typography>
                <Typography color="text.secondary">
                Age:{driver.age}
                </Typography>
                <Typography color="text.secondary">
                Truck Capacity:{driver.truckCapacity}
                </Typography>
                <Typography color="text.secondary">
                Transporter Name:{driver.transporterName}
                </Typography>
                <Typography color="text.primary">
                Experince:{` ${parseInt(driver.drivingExperience)} ${parseInt(driver.drivingExperience)>1?'years':'year'}`}
                </Typography>
          </DialogContent>
          <DialogActions sx={{flexDirection:'column',alignItems:'center'}}>
              {driver.interestedRoutes.map((Route,key)=>{
                  return (
                      <>
                        <Button onClick={()=>BookRide(Route.fromCity,Route.toCity)} variant="contained" sx={{width:'100%',backgroundColor:ACCENT}} key={key}>{`${Route.fromCity}`}<ChevronRightIcon/>{`${Route.toCity}`}</Button>
                        <br/>
                      </>
                  );
                })}
          </DialogActions>
      </Container>
      </Dialog>
    </> 
  )
}
