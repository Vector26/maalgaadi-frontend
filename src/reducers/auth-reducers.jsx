var data = {
    Auth:false,
    user:{}
};
  
  export const Auth = (state=data, action) => {
      switch(action.type){
          case "SET_AUTH": 
            return {...state,Auth:action.isAuth}
          default: return state;
      }
  };
  