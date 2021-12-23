import { combineReducers } from "redux";
import cart from "./cartReducer";
import order from "./orderReducer";
import menu from "./menuReducer";
const rootReducer = combineReducers({
  cart: cart,
  order: order,
  menu: menu,
});

export default rootReducer;
