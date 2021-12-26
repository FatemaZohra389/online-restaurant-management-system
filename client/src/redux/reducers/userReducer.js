import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = { ...action.payload };
    },
    logOut(state, action) {
      state.user = null;
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