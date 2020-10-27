import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import RoomPhoto from "../Components/RoomPhoto";
import utils from "../utils";

const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
`;
const Text = styled.Text``;
const PhotosContainer = styled.View`
  height: ${utils.screenHeight / 4}px;
  width: 100%;
  margin-bottom: 25px;
  overflow: hidden;

  position: relative;
  z-index: 0;
  justify-content: center;
  align-items: center;
`;

export default ({ route, navigation }) => {
  const {
    params: { room },
  } = route;

  useEffect(() => {
    navigation.setOptions({ title: room.name });
  }, []);

  return (
    <Container>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <PhotosContainer>
          <RoomPhoto disabled photos={room.photos} room={room} />
        </PhotosContainer>
        <Text>Room</Text>
      </ScrollView>
    </Container>
  );
};
