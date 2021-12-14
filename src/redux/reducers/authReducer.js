let defaultState = null
  
  let authReducer = (state = defaultState, action) => {
     
    switch (action.type) {
      case "LOGINUSER":
          return action.payload
      case "LOGOUT":
          return null  
      default:
        return state;
    }
  };
  
  export default authReducer;
  