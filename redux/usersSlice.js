import { createSlice } from "@reduxjs/toolkit";
import { toggleRoomFav } from "./roomSlice";

import api from "../api";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
    userID: null,
    favs: [],
    profile: null,
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
    setProfile(state, action) {
      state.profile = action.payload.profile;
    },
  },
});

const { actions, reducer } = userSlice;
export const { login, logout, setProfile } = actions;
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

export const getProfile = () => async (dispatch, getState) => {
  try {
    const {
      usersReducer: { token },
    } = getState();
    const { data } = await api.getProfile(token);
    dispatch(setProfile({ profile: data }));
  } catch (e) {
    alert("while getting profile information, an error or erros occured");
    console.error(e);
  }
};

export default reducer;
