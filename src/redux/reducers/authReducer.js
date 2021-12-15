let defaultState = null
  
  let authReducer = (state = defaultState, action) => {
     
    switch (action.type) {
      case "LOGINUSER":{
        return action.payload
        break
      }
          
      case "LOGOUT":{
        return null  
        break
      }
          
      default:
        return state;
    }
  };
  
  export default authReducer;
  