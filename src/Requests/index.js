import axios from "axios";
const ACCESS_TOKEN="accessToken";
const api=axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
    headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
    }
})

const setAuthToken=(accessToken)=>{
   localStorage.setItem(ACCESS_TOKEN, accessToken);
}

const getAuthToken=()=>{
    return localStorage.getItem(ACCESS_TOKEN);

}

const getHeaders=()=>{
    const accessToken=getAuthToken();
    return accessToken!=null?{
        headers:{
            'Authorization': "Bearer "+getAuthToken(),
            'Content-type':'application/json',
            'Accept':'application/json'
        }
        }:{
            headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
            }
        }
    }


// Auth API

export const SignupDealer=async (data)=>{
    const res=await api.post('/api/v1/auth/dealer/signup',data)
    setAuthToken(res.data.accessToken);
    return res;
}
export const SignupDriver=async (data)=>{
    const res=await api.post('/api/v1/auth/driver/signup',data)
    setAuthToken(res.data.accessToken);
    return res;
}
export const LoginDriver=async (data)=>{
    const res=await api.post('/api/v1/auth/driver/login',data)
    setAuthToken(res.data.accessToken);
    return res;
}
export const LoginDealer=async (data)=>{
    const res=await api.post('/api/v1/auth/dealer/login',data)
    setAuthToken(res.data.accessToken);
    return res;
}
export const LoginDriverOTP=async (data)=>{
    const res=await api.post('/api/v1/auth/driver/login-otp',data)
    setAuthToken(res.data.accessToken);
    return res;
}
export const LoginDealerOTP=async (data)=>{
    const res=await api.post('/api/v1/auth/dealer/login-otp',data)
    setAuthToken(res.data.accessToken);
    return res;
}
export const GetOTP=async (username)=>{return await api.get(encodeURI(`/api/v1/auth/get-otp?username=${username}`))}

// DealerAPI

export const GetDrivers=async (data)=>{return await api.post('/api/v1/dealer/drivers',data,getHeaders())}
export const GetDriversByState=async (data)=>{return await api.post('/api/v1/dealer/drivers-state',data,getHeaders())}
export const GetDriversByRoute=async (data)=>{return await api.post('/api/v1/dealer/drivers-route',data,getHeaders())}
export const BookDriver=async (data)=>{return await api.post('/api/v1/dealer/book',data,getHeaders())}

// DriverAPI

export const GetBookings=async (data)=>{return await api.post('/api/v1/driver/bookings',data,getHeaders())}


export default api;