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
    setFavs(state, action) {
      state.favs = action.payload.favs;
    },
    toggleFav(state, action) {
      const {
        payload: { roomID },
      } = action;
      const {
        explorer: { rooms },
      } = state;

      const room = rooms.find((room) => room.id === roomID);
      if (room) {
        if (room.in_favorite) {
          room.in_favorite = false;
          state.favs = state.favs.filter((room) => room.id !== roomID);
        } else {
          room.in_favorite = true;
          state.favs = [room, ...state.favs];
        }
      }
    },
  },
});

export const {
  setExplorerRooms,
  increasePage,
  setFavs,
  toggleFav,
} = roomsSlice.actions;

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

export const getFavs = () => async (dispatch, getState) => {
  const {
    usersReducer: { userID, token, isLoggedIn },
  } = getState();
  try {
    if (isLoggedIn) {
      const { data } = await api.getFavs(userID, token);

      dispatch(setFavs({ favs: data }));
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
  dispatch(toggleFav({ roomID }));
  try {
    const { data } = await api.toggleFavs(roomID, token);
  } catch (e) {
    console.warn(e);
  }
};

export default roomsSlice.reducer;
