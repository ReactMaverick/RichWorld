let defaultState = null
  
  let couponReducer = (state = defaultState, action) => {
     
    switch (action.type) {
      case "ADD_COUPON":{
        return action.payload
        break
      }
          
      case "DELETE_COUPON":{
        return null  
        break
      }
          
      default:
        return state;
    }
  };
  
  export default couponReducer;
  
  