import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "./cartReducer";

const initialState = {
  list: [],
  loading: false,
  error: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    updateOrderList(state, action) {
      state.list = [...action.payload];
    },
  },
});

export const { updateOrderList, startLoading, stopLoading } =
  orderSlice.actions;

export default orderSlice.reducer;

export const fetchOrders = () => async (dispatch, getState) => {
  dispatch(startLoading());
  axios
    .get("http://localhost:5000/orders")
    .then(function (response) {
      // handle success
      dispatch(updateOrderList(response.data));
    })
    .catch(function (error) {
      // handle error
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const fetchUserOrders = (userId) => async (dispatch, getState) => {
  dispatch(startLoading());
  axios
    .get(`http://localhost:5000/orders/user/${userId}`)
    .then(function (response) {
      // handle success
      dispatch(updateOrderList(response.data));
    })
    .catch(function (error) {
      // handle error
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const addToOrder = (cart) => async (dispatch, getState) => {
  const user = getState().user;
  console.log(user);
  console.log(cart);
  const params = {
    userId: user.data.id,
    address: user.data.address,
    status: "Placed",
    carts: cart,
  };
  dispatch(startLoading());
  axios
    .post("http://localhost:5000/orders", { ...params })
    .then((res) => {
      dispatch(fetchOrders());
      dispatch(clearCart());
    })
    .catch((e) => {
      console.log(e);
      dispatch(stopLoading());
    });
};
