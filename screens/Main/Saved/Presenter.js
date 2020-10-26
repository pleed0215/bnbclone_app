import React from "react";

import styled from "styled-components/native";
import RoomCard from "../../../Components/RoomCard";

const Container = styled.View`
  margin-top: 80px;
  padding: 0 30px;
  flex: 1;
`;

const RoomContainer = styled.ScrollView`
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 36px;
  margin-bottom: 10px;
`;

export default ({ favs }) => {
  
  return (
    <Container>
      <Title>Favorites</Title>
      <RoomContainer
        contentContainerStyle={{ paddingHorizontal: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {favs?.length >0 && favs.map((room) => (
          <RoomCard
            {...room}
            isFav={room.in_favorite ? true : false}
            isSuperHost={room.user.superhost}
            key={`${room.id}+${Math.random() * 20}`}
          />
        ))}
      </RoomContainer>
    </Container>
  );
};

/*

*/
