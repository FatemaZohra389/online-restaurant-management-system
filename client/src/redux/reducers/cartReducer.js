import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMenu(state, action) {
      console.log(state);
      //   state.data = action.payload;
      // state.loading = false;
      // state.error = false;
    },
  },
});

export const { addMenu } = cartSlice.actions;

export default cartSlice.reducer;

export const addMenuToCart = (menu) => async (dispatch) => {
  console.log(menu);
  dispatch(addMenu());
};

/*  export const fetchMissionInfo =
    (
      name: string,
      country: string,
      params?: { limit?: number; claimed?: boolean }
    ) =>
    async (dispatch: Dispatch) => {
      dispatch(fetchMissionLoading());
      return statusAPI
        .get(`/missions/${name}/${country}/`, { params })
        .then(response => {
          dispatch(fetchMissionSuccess(response.data));
          return response.data;
        })
        .catch(() => dispatch(fetchMissionError()));
    };
   */
