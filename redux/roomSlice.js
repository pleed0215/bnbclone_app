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
      state.explorer.rooms.push(action.payload.rooms);
      state.explorer.page = action.payload.page;
    },
  },
});

export const { setExplorerRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
