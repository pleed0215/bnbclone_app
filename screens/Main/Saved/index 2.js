import React from "react";
import { connect } from "react-redux";
import { getFavs } from "../../../redux/roomSlice";
import Container from "./Container";

function mapDispatchToProps(dispatch) {
  return {
    getFavs: () => dispatch(getFavs()),
  };
}

function mapStateToProps(state) {
  return { favs: state.roomsReducer.favs };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
