import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  loading: false,
  error: false,
  filters: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateMenuList(state, action) {
      state.list = [...action.payload];
    },
    setFilters(state, action) {
      state.filters = { ...action.payload };
    },
    clearFilters(state, action) {
      state.filters = null;
    },
  },
});

export const { updateMenuList, setFilters } = menuSlice.actions;

export default menuSlice.reducer;

export const fetchMenu = () => async (dispatch, getState) => {
  const filters = getState().menu.filters;
  axios
    .get("http://localhost:5000/menus", { params: { ...filters } })
    .then(function (response) {
      // handle success
      dispatch(updateMenuList(response.data));
    })
    .catch(function (error) {
      // handle error
    });
};

export const setMenuFilters =
  (params = {}) =>
  async (dispatch, getState) => {
    dispatch(setFilters({ ...params }));
    setTimeout(() => {
      dispatch(fetchMenu());
    }, 5);
  };

export const addMenu = (menu) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/menus", { ...menu })
      .then(function (response) {
        // handle success
        dispatch(fetchMenu(response.data));
        resolve(response.data);
      })
      .catch(function (error) {
        // handle error
        reject(error);
      });
  });
};

export const updateMenu = (menu) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios
      .patch("http://localhost:5000/menus", { ...menu })
      .then(function (response) {
        // handle success
        dispatch(fetchMenu(response.data));
        resolve(response.data);
      })
      .catch(function (error) {
        // handle error
        reject(error);
      });
  });
};

export const deleteMenu = (menu) => async (dispatch, getState) => {
  axios
    .delete(`http://localhost:5000/menus/${menu.id}`)
    .then(function (response) {
      // handle success
      dispatch(fetchMenu(response.data));
    })
    .catch(function (error) {
      // handle error
    });
};
