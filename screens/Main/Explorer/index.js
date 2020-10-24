import React from "react";
import { connect } from "react-redux";
import { getRooms } from "../../../redux/roomSlice";
import ModuleContainer from "./Container";

function mapDispatchToProps(dispatch) {
  return {
    getRooms: () => dispatch(getRooms()),
  };
}

function mapStateToProps(state) {
  return state.roomsReducer.explorer;
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer);
