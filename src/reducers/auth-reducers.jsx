// import { addTodo,remove,deleteTodo } from "../actions";
import { setAuth } from "../actions/auth-actions";

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
  