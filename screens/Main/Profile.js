import React, { useEffect, useState } from "react";
import { ActiveIndicator } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { getProfile } from "../../redux/usersSlice";
import utils from "../../utils";
import ThemeColor from "../../color";

const Container = styled.View`
  width: 100%;
  height: ${utils.screenHeight / 3}px;
  padding: 10px;

  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

const ContainerImage = styled.ImageBackground`
  width: ${utils.screenWidth - 10}px;

  height: ${utils.screenHeight / 3}px;
  resize-mode: cover;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;

const ProfileContainer = styled.View`
  position: absolute;
  top: 150px;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 200px;
  align-items: center;
  border-radius: 10px;
`;
const AvatarContainer = styled.View`
  position: absolute;
  top: -60px;
  width: 120px;
  height: 120px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${ThemeColor.grey};
  box-shadow: 2px 3px 3px rgba(50, 50, 50, 0.8);
`;
const AvatarInitial = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 600;
  text-transform: uppercase;
`;

const AvatarImage = styled.Image`
  width: 150px;
  height: 150px;
`;

const NameContainer = styled.View`
  align-items: center;
  margin-top: 70px;
`;

const NameText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const UsernameText = styled.Text`
  font-size: 12px;
  font-weight: 600;
`;
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
      getProfile();
    }
  }, []);
  return (
    <Container>
      <ContainerImage source={utils.defaultImage}>
        {profile &&
          (loading ? (
            <ActiveIndicator />
          ) : (
            <ProfileContainer>
              <AvatarContainer>
                {profile.avatar ? (
                  <AvatarImage source={{ uri: profile.avatar.file }} />
                ) : (
                  <AvatarInitial>{profile.username.slice(0, 2)}</AvatarInitial>
                )}
              </AvatarContainer>
              <NameContainer>
                <NameText>{`${profile.first_name} ${profile.last_name}`}</NameText>
                <UsernameText>{profile.username}</UsernameText>
              </NameContainer>
            </ProfileContainer>
          ))}
      </ContainerImage>
    </Container>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
