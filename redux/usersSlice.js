import { createSlice } from "@reduxjs/toolkit";

import api from "../api";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

const { actions, reducer } = userSlice;
export const { login, logout } = actions;
export const apiLogin = (form) => async (dispatch) => {
  try {
    const {
      data: { id, token },
    } = await api.userLogin(form);
    if (id && token) dispatch(login({ id, token }));
  } catch (e) {
    console.log(e);
    alert("Wrong user/password");
  }
};
export default reducer;
