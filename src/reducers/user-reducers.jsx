const IS_DEALER="isDealer";
const AUTH="Auth"
var data = {
    isDealer:localStorage.getItem(AUTH)!=null?(eval(localStorage.getItem(IS_DEALER))===true):true
};
  
  export const User = (state=data, action) => {
      switch(action.type){
          case "IS_DEALER":
            localStorage.setItem(IS_DEALER,action.isDealer);
            return {...state,isDealer:action.isDealer}
          default: return state;
      }
  };
  