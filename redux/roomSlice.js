import { createSlice } from "@reduxjs/toolkit";

import api from "../api";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    explorer: {
      page: 1,
      rooms: [],
    },
    favs: [],
  },
  reducers: {
    setExplorerRooms(state, action) {
      const {
        explorer: { rooms },
      } = state;
      const { payload } = action;
      if (payload.page === 1) {
        state.explorer.rooms = payload.rooms;
        state.explorer.page = 1;
      } else {
        state.explorer.rooms = [...state.explorer.rooms, ...payload.rooms];
      }
    },
    increasePage(state, action) {
      state.explorer.page += 1;
    },
  },
});

export const { setExplorerRooms, increasePage } = roomsSlice.actions;

export const getRooms = (page = 1) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    const {
      data: { results },
    } = await api.rooms(page, token);
    dispatch(
      setExplorerRooms({
        rooms: results,
        page,
      })
    );
  } catch (e) {
    console.warn(e);
  }
};

export default roomsSlice.reducer;
