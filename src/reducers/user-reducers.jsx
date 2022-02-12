var data = {
    isDealer:true
};
  
  export const User = (state=data, action) => {
      switch(action.type){
          case "IS_DEALER": 
            return {...state,isDealer:action.isDealer}
          default: return state;
      }
  };
  