import React from "react";
import { connect } from "react-redux";
import { getFavs } from "../../../redux/usersSlice";
import Container from "./Container";

function mapDispatchToProps(dispatch) {
  return {
    getFavs: () => dispatch(getFavs()),
  };
}

export default connect(null, mapDispatchToProps)(Container);
