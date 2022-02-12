import React from 'react'
import { useSelector } from 'react-redux'
import DealerDashboard from './DealerDashboard'
import DriverDashboard from './DriverDashboard'

const Dashboard = () => {
    const isDealer=useSelector((state)=>state.User.isDealer)
    return (isDealer?
    (<><DealerDashboard/></>):
    (<><DriverDashboard/></>)
    )
}

export default Dashboard