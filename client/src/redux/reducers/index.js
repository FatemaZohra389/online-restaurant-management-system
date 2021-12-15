import { combineReducers } from "redux";
import cart from "./cartReducer";
const rootReducer = combineReducers({
  cart: cart,
});

export default rootReducer;
