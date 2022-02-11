import logo from './logo.svg';
import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import { setAuth } from './actions/auth-actions';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
const HOME_ROUTE="/"
const AUTH_ROUTE="/authenticate"
const DASHBOARD="/dashboard"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <GuestRoute path={HOME_ROUTE} exact>
            <h1>Guest route</h1>
          </GuestRoute>
          <GuestRoute path={AUTH_ROUTE} exact>
            <h1>Auth route</h1>
          </GuestRoute>
          <ProtectedRoute path={DASHBOARD} exact>
            <h1>Private route</h1>
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
