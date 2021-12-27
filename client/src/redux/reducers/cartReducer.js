import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart(state, action) {
      state.list = [...action.payload];
    },
    clearAll(state) {
      state.list = [];
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
});

export const { updateCart, clearAll, startLoading, stopLoading } =
  cartSlice.actions;

export default cartSlice.reducer;

export const addMenuToCart = (menu) => async (dispatch, getState) => {
  const list = getState().cart.list;
  let temp = [...list];
  let found = false;
  temp = temp.map((item) => {
    if (item.id === menu.id) {
      found = true;
      return {
        ...menu,
        qty: item.qty + 1,
      };
    } else {
      return item;
    }
  });
  if (!found) {
    temp.push({
      ...menu,
      qty: 1,
    });
  }
  dispatch(updateCart(temp));
};

export const decreaseQtyFromCart = (menu) => async (dispatch, getState) => {
  const list = getState().cart.list;
  let temp = [...list];
  temp = temp.map((item) => {
    if (item.id === menu.id && item.qty > 1) {
      return {
        ...menu,
        qty: item.qty - 1,
      };
    } else {
      return item;
    }
  });
  dispatch(updateCart(temp));
};

export const removeMenuFromCart = (menu) => async (dispatch, getState) => {
  const list = getState().cart.list;
  let temp = [...list];
  temp = temp.map((item) => {
    if (item.id === menu.id) {
      return null;
    } else {
      return item;
    }
  });
  temp = temp.filter((item) => item !== null);
  dispatch(updateCart(temp));
};

export const clearCart = () => async (dispatch) => {
  dispatch(clearAll());
};
