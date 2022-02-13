import { Button, Card, CardActions, CardContent, Checkbox, Container, Dialog, IconButton, Skeleton, TextField, Typography } from '@mui/material'
import React,{useEffect, useState} from 'react'
import Paper from '@mui/material/Paper';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box } from '@mui/system';
import './DealerDashboard.css';
import { GetDrivers, GetDriversByRoute, GetDriversByState } from '../../Requests';
import { useDispatch, useSelector } from 'react-redux';
import {CSkeleton} from '../../Components/CSkeleton';
import {setFeed} from '../../actions/user-actions';
import { BD } from '../../Components/BookingDialoge/BD';

const DealerDashboard = () => {
  const TIMEOUT=1000;
  const DRIVER_LIST="driverList";
  const {state:State,city:City}=useSelector((state)=>state.Auth.user);
  let Feed=useSelector((state)=>state.User.Feed);
  const dispatch=useDispatch();
  const [Loading, setLoading] = useState(true);
  const [ToCity, setToCity] = useState("");
  const [FromCity, setFromCity] = useState("");
  const [DialogueOn, setDialogueOn] = useState(false);
  
  const setfeed=(data)=>{
    setTimeout(()=>setLoading(false), TIMEOUT);
    dispatch(setFeed(data));
  }

  const loadByRoute=async()=>{
    let res=await GetDriversByRoute({
        "fromCity": FromCity,
        "toCity": ToCity,
        "pageNumber": 0,
        "pageSize": 10,
        "sortBy": "name",
        "descending": false
    });
    console.log(res);
    setTimeout(()=>setLoading(false), TIMEOUT);
    setfeed(res.data[DRIVER_LIST])
  }

  const loadFeedbyCity = async()=>{
    // setLoading(true);
    let res=await GetDrivers({
      "city": City,
      "pageNumber": 0,
      "pageSize": 10,
      "sortBy": "name",
      "descending": false
    });
    setTimeout(()=>setLoading(false), TIMEOUT);
    setfeed(res.data[DRIVER_LIST])
    // console.log(Feed);
  }
  const loadFeedbyState = async(e)=>{
    if(e.target.checked)
    {
      setLoading(true);
      let res=await GetDriversByState({
        "state": State,
        "pageNumber": 0,
        "pageSize": 10,
        "sortBy": "name",
        "descending": false
      });
      setfeed(res.data[DRIVER_LIST])
    }
    else{
      loadFeedbyCity();
    }
  }
  useEffect(()=>{
    loadFeedbyCity();
  },[])

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

  const filters=(<>
        <Box sx={{display:'flex',flexDirection:'column',padding:'1em'}}>
        <Typography variant="h4">Filters</Typography>
        <Box className="filterFields">
          <Typography variant="caption">Show all from my State</Typography>
          <Checkbox
          onChange={loadFeedbyState}
          />
          <br/>
          <TextField
          onChange={(e)=>setFromCity(e.target.value)}
          placeholder='From City'
          />
          <TextField
          onChange={(e)=>setToCity(e.target.value)}
          placeholder='To City'
          />
          <Button onClick={loadByRoute}>Filter</Button>
        </Box>
        </Box>
        </>
  );

  return (
    <>
    <Dialog
    onClose={()=>setDialogueOn(false)}
    open={DialogueOn}
    >
      <Container sx={{display:'flex',minWidth:'100%',height:'100%',flexWrap:'wrap',padding:'0.5em'}}>
      {filters}
      </Container>
    </Dialog>
    <Box sx={{display:{xs:'flex',md:'flex',lg:'none'},flex:1,height:'fit-content',marginRight:'1em',justifyContent:'center'}}>
        <IconButton onClick={()=>setDialogueOn(true)}>
          <FilterListIcon/>
        </IconButton>
    </Box>
    <Container sx={{display:'flex',minWidth:'100%',height:'100%',flexWrap:'wrap',paddingTop:'2em'}}>
    <Container className="filtersContainer" sx={{display:{xs:'none',md:'none',lg:'flex'},flex:1,height:'fit-content',backgroundColor:'white',alignItems:'center',flexDirection:'column',marginRight:'1em',padding:'2em 0'}}>
      {filters}
    </Container>
      <Container className="market" component={Paper} sx={{display:'flex',justifyContent:'space-evenly',flex:4,height:'100%',flexWrap:'wrap',overflowY:'scroll',padding:'1em'}}>
      {
        Loading?preLoad:(
            Feed.map((driver,key)=>{
              return <DriverCard key={key} index={key} driver={driver}/>
            })
          )
      }
      </Container>
    </Container>
    </>
  )
}

const DriverCard=({driver,index})=>{
  const [DialogueOn2, setDialogueOn2] = useState(false);
  // console.log(index);
  return(
    <>
      <BD
      index={index}
      onClose={()=>setDialogueOn2(false)}
      open={DialogueOn2}
      />
      <Card sx={{ minWidth: 275,maxHeight:200 ,padding:'0.5em'}}>
        <CardContent sx={{textAlign:'left'}}>
        <Typography color="text.secondary">
            Name:{driver.user.name}
          </Typography>
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
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{setDialogueOn2(true)}}>Book Now</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default DealerDashboard