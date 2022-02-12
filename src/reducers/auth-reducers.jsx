const AUTH="Auth"
const USER="User"

var data = {
    Auth:localStorage.getItem(AUTH)!=null?(eval(localStorage.getItem(AUTH))===true):false,
    user:localStorage.getItem(AUTH)!=null?JSON.parse(localStorage.getItem(USER)):{}
};
  
  export const Auth = (state=data, action) => {
      switch(action.type){
          case "SET_AUTH":
            localStorage.setItem(AUTH,action.isAuth);
            return {...state,Auth:action.isAuth}
          case "SET_USER":
            localStorage.setItem(USER,JSON.stringify(action.data));
            return {...state,user:action.data}
          default: return state;
      }
  };
  