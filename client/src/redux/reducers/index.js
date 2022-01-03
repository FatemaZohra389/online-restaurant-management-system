import { combineReducers } from "redux";
import cart from "./cartReducer";
import order from "./orderReducer";
import menu from "./menuReducer";
import user from "./userReducer";
import customer from "./customerReducer";
const rootReducer = combineReducers({
  cart: cart,
  order: order,
  menu: menu,
  user,
  customer,
});

export default rootReducer;
