import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    loading: false,
    error: false,
  };

  const cartSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addCartToOrder(state, action) {
        state.list = [...action.payload];
      },
    },
  });
  

export const { addCartToOrder  } = cartSlice.actions;

export default cartSlice.reducer;

export const addToOrder = (cart) => async (dispatch, getState) => {
  const list = getState().order.list;
 let temp=[...list];
 temp.push(cart);

  
    dispatch(addCartToOrder(temp));
  };
  
  
  