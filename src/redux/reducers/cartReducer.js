let defaultState = []
  
  let cartReducer = (state = defaultState, action) => {
     
    switch (action.type) {
      case "INTIALIZE_CART":{
        
        return action.payload
        break
      }
          
      case "ADD_CART_ITEM":{         
        return action.payload
        break
      }
      case "DELETE_CART_ITEM":{
        return action.payload
        break
      }
          
      default:
        return state;
    }
  };
  
  export default cartReducer;
  
  