import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import roomsReducer from "./roomSlice";

export default combineReducers({ usersReducer, roomsReducer });
