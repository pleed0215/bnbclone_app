import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { getProfile } from "../../redux/usersSlice";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Text = styled.Text``;

function mapStateToProps(state) {
  return { profile: state.profile };
}

function mapDispatchToProps(dispatch) {
  return { getProfile: () => dispatch(getProfile()) };
}

const Profile = ({ profile, getProfile }) => {
  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, []);
  return (
    <Container>
      <Text>Profile</Text>
    </Container>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
