import { createSlice } from "@reduxjs/toolkit";

import api from "../api";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
    userID: null,
    favs: [],
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userID = action.payload.id;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.userID = null;
    },
    favs(state, action) {
      state.favs = action.payload.favs;
    },
  },
});

const { actions, reducer } = userSlice;
export const { login, logout, favs } = actions;
export const apiLogin = (form) => async (dispatch) => {
  try {
    const {
      data: { id, token },
    } = await api.userLogin(form);
    console.log(id, token);
    if (id && token) dispatch(login({ id, token }));
  } catch (e) {
    console.log(e);
    alert("Wrong user/password");
  }
};

export const getFavs = () => async (dispatch, getState) => {
  const {
    usersReducer: { userID, token, isLoggedIn },
  } = getState();
  try {
    if (isLoggedIn) {
      const { data } = await api.getFavs(userID, token);

      dispatch(favs({ favs: data }));
    } else {
      throw Error("Login required");
    }
  } catch (e) {
    console.warn(e);
  }
};

export const toggleFavs = (roomID) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    const { data } = await api.toggleFavs(roomID, token);
    dispatch(favs({ favs: data }));
  } catch (e) {
    console.warn(e);
  }
};

export default reducer;
