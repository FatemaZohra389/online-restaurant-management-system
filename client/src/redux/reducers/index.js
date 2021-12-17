import { combineReducers } from "redux";
import cart from "./cartReducer";
import order from "./orderReducer";
const rootReducer = combineReducers({
  cart: cart,
  order: order,
});

export default rootReducer;
