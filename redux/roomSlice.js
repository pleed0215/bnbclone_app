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
      state.explorer.rooms = [];
      action.payload.rooms.forEach((room) => state.explorer.rooms.push(room));
      state.explorer.page = action.payload.page;
    },
  },
});

export const { setExplorerRooms } = roomsSlice.actions;

export const getRooms = (page = 1) => async (dispatch) => {
  try {
    const {
      data: { results },
    } = await api.rooms();
    dispatch(
      setExplorerRooms({
        rooms: results,
        page,
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export default roomsSlice.reducer;
