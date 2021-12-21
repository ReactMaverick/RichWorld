import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import couponReducer from "./couponReducer";

let reducers = combineReducers({
  cartReducer: cartReducer,
  authReducer: authReducer,
  couponReducer: couponReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
