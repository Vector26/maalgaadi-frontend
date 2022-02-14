import logo from './logo.svg';
import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import { setAuth } from './actions/auth-actions';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Navigation, { ActionBox } from './Components/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import { LIGHT_PRIMARY, PRIMARY } from './Colors';
import AboutUs from './pages/AboutUs/AboutUs';
const HOME_ROUTE="/"
const ABOUT_ROUTE="/about"
const AUTH_ROUTE="/authenticate"
const DASHBOARD="/dashboard"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <GuestRoute path={HOME_ROUTE} exact>
          <Navigation color="white" bg={"Transparent"}/>
            <Home/>
          </GuestRoute>
          <GuestRoute path={ABOUT_ROUTE} exact>
            <Navigation color="white" bg={PRIMARY}/>
            <ActionBox sx={{backgroundColor:LIGHT_PRIMARY}}>
            <AboutUs/>
            </ActionBox>
          </GuestRoute>
          <GuestRoute path={AUTH_ROUTE} exact>
          <Navigation color="white" bg={PRIMARY}/>
          <ActionBox sx={{backgroundColor:LIGHT_PRIMARY}}>
            <Authenticate/>
          </ActionBox>
          </GuestRoute>
            <ProtectedRoute path={DASHBOARD} exact>
            <Navigation color="white" bg={PRIMARY}/>
            <ActionBox sx={{backgroundColor:LIGHT_PRIMARY}}>
              <Dashboard/>
            </ActionBox>
            </ProtectedRoute>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

function GuestRoute({children,...rest}) {
  let User=useSelector((state)=> state.Auth.user);
  let isAuth=useSelector((state)=> state.Auth.Auth);
  console.log(User);
  return <Route
    render={({location})=>{
      return (
        !isAuth ? 
        (
          children
        ): (
          <Redirect to={{
            pathname:DASHBOARD,
            state:{from:location}
          }}/>
          )
      )
    }}
  ></Route>;
}

function ProtectedRoute({children,...rest}) {
  let User=useSelector((state)=> state.Auth.user);
  let isAuth=useSelector((state)=> state.Auth.Auth);
  return <Route
    render={({location})=>{
      return (
        !isAuth ? 
        (
          <Redirect to={{
            pathname:AUTH_ROUTE,
            state:{from:location}
          }}/>
        ): (
            children
          )
      )
    }}
  ></Route>;
}

export default App;
