import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import utils from "../../../utils";
import ThemeColor from "../../../color";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const ScrollView = styled.ScrollView`
  position: absolute;
  bottom: 50px;
`;

const RoomContainer = styled.View`
  background-color: transparent;
  width: ${utils.screenWidth}px;
  align-items: center;
`;

const RoomCard = styled.View`
  background-color: white;
  width: ${windowWidth - 80}px;
  height: 120px;
  border-radius: 10px;
  padding: 0px 20px;
  flex-direction: row;
  align-items: center;
`;

const RoomPhoto = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${ThemeColor.grey};
  margin-right: 10px;
`;

const Column = styled.View`
  width: 70%;
`;

const RoomName = styled.Text`
  font-size: 18px;
`;

const RoomPrice = styled.Text`
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? 600 : 100)};
`;

const Presenter = ({ rooms }) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const mapRef = useRef();

  const onScroll = ({ nativeEvent: { contentOffset } }) => {
    const { x } = contentOffset;
    const index = Math.abs(Math.floor(x / utils.screenWidth));

    if (currentIndex != index) setCurrentIndex(index);
  };

  useEffect(() => {
    mapRef?.current?.animateCamera(
      {
        center: {
          latitude: parseFloat(rooms[currentIndex].lat),
          longitude: parseFloat(rooms[currentIndex].lng),
        },
        altitude: 0,
        pitch: 0,
        heading: 0,
        zoom: 18,
      },
      { duration: 1000 }
    );
  }, [currentIndex]);

  return (
    <Container>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        camera={{
          center: {
            latitude: parseFloat(rooms[0].lat),
            longitude: parseFloat(rooms[0].lng),
          },
          altitude: 0,
          pitch: 0,
          heading: 0,
          zoom: 18,
        }}
      >
        {rooms?.map((room) => (
          <Marker
            key={room.id}
            coordinate={{
              longitude: parseFloat(room.lng),
              latitude: parseFloat(room.lat),
            }}
          />
        ))}
      </MapView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={100}
        onScroll={onScroll}
      >
        {rooms?.map((room) => (
          <RoomContainer key={room.id}>
            <TouchableOpacity
              onPress={() => navigation.navigate("RoomDetail", { room })}
            >
              <RoomCard>
                <RoomPhoto
                  source={
                    room.photos.length > 0
                      ? { uri: room.photos[0]?.file }
                      : utils.defaultImage
                  }
                />
                <Column>
                  <RoomName numberOfLines={1}>{room.name}</RoomName>
                  <RoomPrice bold>${room.price} / night</RoomPrice>
                </Column>
              </RoomCard>
            </TouchableOpacity>
          </RoomContainer>
        ))}
      </ScrollView>
    </Container>
  );
};

export default Presenter;