import { Button, Card, CardActions, CardContent, Checkbox, Container, Dialog, IconButton, MenuItem, Select, Skeleton, TextField, Typography } from '@mui/material'
import React,{useEffect, useRef, useState} from 'react'
import Paper from '@mui/material/Paper';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box } from '@mui/system';
import './DealerDashboard.css';
import { GetDrivers, GetDriversByRoute, GetDriversByState } from '../../Requests';
import { useDispatch, useSelector } from 'react-redux';
import {CSkeleton} from '../../Components/CSkeleton';
import {setFeed} from '../../actions/user-actions';
import { BD } from '../../Components/BookingDialoge/BD';
import {ACCENT, DARK_PRIMARY, LIGHT_PRIMARY} from '../../Colors/index';
import data from '../../data/CS.json';

const DealerDashboard = () => {
  const TIMEOUT=1000;
  const DRIVER_LIST="driverList";
  const {state:State,city:City}=useSelector((state)=>state.Auth.user);
  let Feed=useSelector((state)=>state.User.Feed);
  const dispatch=useDispatch();
  const [Loading, setLoading] = useState(true);
  const [FromCity, setFromCity] = useState(data["Choose State"]);
  const [FromState, setFromState] = useState("Choose State");
  const [ToCity, setToCity] = useState(data["Choose State"]);
  const [ToState, setToState] = useState("Choose State");
  const [DialogueOn, setDialogueOn] = useState(false);
  // console.log(data[ToState]);
  
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
    // console.log(res);
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
    setfeed(res.data[DRIVER_LIST])
    // console.log(Feed);
  }
  const loadFeedbyState = async(e)=>{
    setLoading(true);
    if(e.target.checked)
    {
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

  // console.log(cities);
  const filters=(<>
        <Box sx={{display:'flex',flexDirection:'column',padding:'1em'}}>
        <Typography variant="h4">Filters</Typography>
        <Box className="filterFields">
          <Typography variant="caption">Show all from my State</Typography>
          <Checkbox
          id="ST"
          onChange={loadFeedbyState}
          />
          <br/>
          <Select
                fullWidth
                value={FromState}
                label="State"
                onChange={(e)=>setFromState(e.target.value)}>
                    {Object.keys(data).map((State,k)=>{
                        return <MenuItem key={k} value={State}>{State}</MenuItem>
                    })}
            </Select>
            <Select
                fullWidth
                value={FromCity}
                label="City"
                placeholder='City'
                defaultValue="Select City"
                onChange={(e)=>setFromCity(e.target.value)}>
                    {data[FromState].map((city,k)=>{
                        return <MenuItem key={k} sx={{color:'black'}} value={city}>{city}</MenuItem>
                    })}
            </Select>
            <br/>
            <Typography sx={{paddingLeft:'1.5em'}} variant="subtitle">To</Typography>
            <br/>
            <Select
                fullWidth
                value={ToState}
                label="State"
                onChange={(e)=>setToState(e.target.value)}>
                    {Object.keys(data).map((State,k)=>{
                        return <MenuItem key={k} value={State}>{State}</MenuItem>
                    })}
            </Select>
            <Select
                fullWidth
                value={ToCity}
                label="City"
                placeholder='City'
                defaultValue={ToState[0]}
                onChange={(e)=>setToCity(e.target.value)}>
                    {data[ToState].map((city,k)=>{
                        return <MenuItem key={k} sx={{color:'black'}} value={city}>{city}</MenuItem>
                    })}
            </Select>
          {/* <TextField
          onChange={(e)=>setFromCity(e.target.value)}
          placeholder='From City'
          />
          <TextField
          onChange={(e)=>setToCity(e.target.value)}
          placeholder='To City'
          /> */}
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
        Loading?preLoad:(Feed.length>0?
            Feed.map((driver,key)=>{
              return <DriverCard key={key} index={key} driver={driver}/>
            }):<Typography variant="h2">No drivers Available</Typography>
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
      <Card component={Paper} sx={{ minWidth: 275,maxHeight:200 ,padding:'0.5em'}}>
        <CardContent sx={{textAlign:'left'}}>
        <Typography color="text.secondary" variant="h6" sx={{fontWeight:'bold'}}>
            {driver.user.name}
          </Typography>
          <Typography variant="body2">
            {driver.age} years old
          </Typography>
          <Typography variant="body2">
            Truck Capacity:{driver.truckCapacity}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Transporter Name:{driver.transporterName}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Experince:{` ${parseInt(driver.drivingExperience)} ${parseInt(driver.drivingExperience)>1?'years':'year'}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" sx={{backgroundColor:ACCENT}} variant="contained" onClick={()=>{setDialogueOn2(true)}}>Book Now</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default DealerDashboard