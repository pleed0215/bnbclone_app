import React, { useEffect, useState } from "react";
import {ActiveIndicator} from "react-native";
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
  return { profile: state.usersReducer.profile };
}

function mapDispatchToProps(dispatch) {
  return { getProfile: () => dispatch(getProfile()) };
}

const Profile = ({ profile, getProfile }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!profile) {
      setLoading(true);
      getProfile();
      setLoading(false);
      console.log(profile);
    }
  }, []);
return <Container>{profile && (loading?<ActiveIndicator />:<Text>{profile.username}</Text>)}</Container>
    
  
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
