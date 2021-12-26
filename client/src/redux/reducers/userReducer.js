import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.data = { ...action.payload };
    },
    logOut(state) {
      state.data = null;
    },
  },
});

export const { loginSuccess, logOut } = userSlice.actions;

export default userSlice.reducer;

export const userLoginSuccessful = (user) => async (dispatch) => {
  dispatch(loginSuccess(user));
};

export const userLogOut = () => async (dispatch) => {
  dispatch(logOut());
};