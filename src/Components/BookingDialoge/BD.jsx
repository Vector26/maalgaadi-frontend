import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography,Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const BD = ({index,onClose,open}) => {
    let driver=useSelector(state=>state.User.Feed[index]);
    // console.log(driver);
    return (
      <Dialog
        sx={{width:'100%'}}
        onClose={onClose}
        open={open}
      ><Container sx={{padding:'1em'}}>
          <DialogTitle><Typography variant="body2">{driver.user.name}</Typography></DialogTitle>
          <DialogContent>
                <Typography variant="body2">{driver.user.mobileNumber}</Typography>
                <Typography variant="body2">{driver.user.mobileNumber}</Typography>
                <Typography color="text.secondary">
                Age:{driver.age}
                </Typography>
                <Typography color="text.secondary">
                Truck Capacity:{driver.truckCapacity}
                </Typography>
                <Typography variant="body2">
                Transporter Name:{driver.transporterName}
                </Typography>
                <Typography variant="body2">
                Experince:{` ${parseInt(driver.drivingExperience)} ${parseInt(driver.drivingExperience)>1?'years':'year'}`}
                </Typography>
          </DialogContent>
          <DialogActions sx={{flexDirection:'column'}}>
              {driver.interestedRoutes.map((Route,key)=>{
                  return (
                  <Button variant="contained" sx={{marginBottom:'1em',width:'100%'}} key={key}>{`${Route.fromCity}`}<ChevronRightIcon/>{`${Route.toCity}`}</Button>
                  );
              })}
          </DialogActions>
      </Container>
      </Dialog>
  )
}
