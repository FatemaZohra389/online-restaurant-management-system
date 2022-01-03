import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  loading: false,
  error: false,
};

const orderSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    updateCustomerList(state, action) {
      state.list = [...action.payload];
    },
  },
});

export const { updateCustomerList, startLoading, stopLoading } =
  orderSlice.actions;

export default orderSlice.reducer;

export const fetchCustomers = () => async (dispatch, getState) => {
  dispatch(startLoading());
  axios
    .get("http://localhost:5000/users/customers")
    .then(function (response) {
      // handle success
      dispatch(updateCustomerList(response.data));
    })
    .catch(function (error) {
      // handle error
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};
