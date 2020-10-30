import React from "react";
import { connect } from "react-redux";
import { getRooms, increasePage } from "../../../redux/roomSlice";
import { toggleFavs } from "../../../redux/usersSlice";
import ModuleContainer from "./Container";

function mapDispatchToProps(dispatch) {
  return {
    getRooms: (page) => dispatch(getRooms(page)),
    increasePage: () => dispatch(increasePage()),
  };
}

function mapStateToProps(state) {
  return state.roomsReducer.explorer;
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer);
