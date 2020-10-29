import React from "react";
import { connect } from "react-redux";

import Container from "./Container";

function mapStateToProps(state) {
  return { roomsReducer: state.roomsReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    getRooms: (page) => dispatch(getRooms(page)),
    increasePage: () => dispatch(increasePage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
