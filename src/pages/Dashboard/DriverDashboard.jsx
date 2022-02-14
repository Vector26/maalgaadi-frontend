import { Card, Box,CardActions, CardContent, CardHeader, Container, Paper, Typography } from '@mui/material';
import React ,{useEffect, useState}from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setBookings } from '../../actions/user-actions';
import { CSkeleton } from '../../Components/CSkeleton';
import { GetBookings } from '../../Requests';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DriverDashboard = () => {
  const TIMEOUT=1000;
  const [Loading, setLoading] = useState(true);
  const dispatch=useDispatch();
  const driver=useSelector((State)=>State.Auth.user.driverId);
  const bookings=useSelector((State)=>State.User.Bookings);
  useEffect(async ()=>{
    let res= await GetBookings({
      "pageNumber": 0,
      "pageSize": 10,
      "driverId": driver,
      "sortBy": "bookedOn",
      "descending": false
    });
    setbookings(res.data["bookingList"]);
    // setLoading(false);
  },[]);
  
  const setbookings=(data)=>{
    setTimeout(()=>setLoading(false), TIMEOUT);
    dispatch(setBookings(data))
  }

  const preLoad=(
    <>
      <CSkeleton animation="wave" variant="rectangular" />
      <CSkeleton animation="wave" variant="rectangular" />
      <CSkeleton animation="wave" variant="rectangular" />
      <CSkeleton animation="wave" variant="rectangular" />
      <CSkeleton animation="wave" variant="rectangular" />
      <CSkeleton animation="wave" variant="rectangular" />
      <CSkeleton animation="wave" variant="rectangular" />
      <CSkeleton animation="wave" variant="rectangular" />
      <CSkeleton animation="wave" variant="rectangular" />
    </>
    );

  return (
    <>
    <Container className="market" component={Paper} sx={{flex:4,height:'100%',flexWrap:'wrap',overflowY:'scroll',padding:'1em'}}>
    <Typography color="black" variant="h4">Bookings For You 😁</Typography>
    <Container className="market" component={Paper} sx={{display:'flex',justifyContent:'flex-start',flex:4,height:'100%',flexWrap:'wrap',overflowY:'scroll',padding:'1em'}}>
      {
        Loading?preLoad:(
          bookings.map((booking,key)=>{
            return <Booking booking={booking} key={key}/>
          })
          )
        }
      </Container>
      </Container>
    </>
  )
}

const Booking=({booking})=>{
  return(
    <>
    <Card sx={{textAlign:"left",height:'fit-content',flex:'1',maxWidth:'20em'}}>
      <CardContent>
        <Typography color="black" variant="h5">{`${booking.fromCity} >`}{` ${booking.toCity}`}</Typography>
        <Typography>Dealer:{booking.dealer.user.name}</Typography>
        <Typography>Nature of Delivery:{booking.dealer.natureOfMaterial}</Typography>
        <Typography>Weight of Delivery:{booking.dealer.weightOfMaterial}</Typography>
        <Typography>Quanitity of Delivery:{booking.dealer.quantity}</Typography>
        <Typography>Booking Date:{booking.bookingDate}</Typography>
      </CardContent>
    </Card>
    
    </>
  )
}

export default DriverDashboard

// (
//   .map((driver,key)=>{
//     return <Booking key={key} index={key} booking={booking}/>
//   })
// )