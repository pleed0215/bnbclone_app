import React from "react";
import { ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import RoomCard from "../../../Components/RoomCard";

import ThemeColor from "../../../color";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-horizontal: 7px;
`;
const Text = styled.Text``;

const FakeBar = styled.View`
  height: 40px;
  width: 100%;
  margin-top: 80px;
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  justify-content: center;
  padding-horizontal: 10px;
`;
const FakeText = styled.Text`
  font-size: 16px;
  font-weight: 300;
`;

const LoadMore = styled.View`
  width: 100%;
  padding: 10px;
  align-items: center;
  background-color: ${ThemeColor.green};
  border-radius: 5px;
`;

const LoadMoreText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export default ({ rooms, increasePage }) => (
  <Container>
    {rooms.length === 0 ? (
      <ActivityIndicator color="black" />
    ) : (
      <>
        <FakeBar>
          <FakeText>Search...</FakeText>
        </FakeBar>
        <ScrollView
          style={{ width: "100%", marginBottom: 20 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsVerticalScrollIndicator={false}
        >
          {rooms.map((room) => (
            <RoomCard
              {...room}
              isFav={room.in_favorite ? true : false}
              isSuperHost={room.user.superhost}
              key={`${room.id}+${Math.random() * 20}`}
            />
          ))}
          <TouchableOpacity onPress={increasePage}>
            <LoadMore>
              <LoadMoreText>Load More</LoadMoreText>
            </LoadMore>
          </TouchableOpacity>
        </ScrollView>
      </>
    )}
  </Container>
);
