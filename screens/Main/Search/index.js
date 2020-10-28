import React from "react";
import { connect } from "react-redux";

import Container from "./Container";

function mapStateToProps(state) {
  return { token: state.usersReducer.token };
}

export default connect(mapStateToProps, null)(Container);
