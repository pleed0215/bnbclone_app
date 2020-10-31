import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import ThemeColor from "../../../color";
import { TouchableOpacity } from "react-native-gesture-handler";
import utils from "../../../utils";

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

const MarkerContainer = styled.View`
  background-color: ${({ selected }) =>
    selected ? ThemeColor.red : ThemeColor.green};
  padding: 10px;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
`;
const MarkerText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

const MarkerTriangle = styled.View`
  border: 10px solid transparent;
  border-top-color: ${({ selected }) =>
    selected ? ThemeColor.red : ThemeColor.green};
  width: 10px;
`;

const MarkerWrapper = styled.View`
  align-items: center;
`;
const RoomMarker = ({ selected, price }) => (
  <MarkerWrapper>
    <MarkerContainer selected={selected}>
      <MarkerText>${price}</MarkerText>
    </MarkerContainer>
    <MarkerTriangle selected={selected} />
  </MarkerWrapper>
);

const NearByContainer = styled.View`
  width: ${utils.screenWidth}px;
  height: 110px;
  padding-horizontal: 10px;
  position: absolute;
  top: 30px;
  background-color: rgba(255, 255, 255, 0.5);
`;
const NearByScrollView = styled.ScrollView``;

const NearByImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 10px;
`;

const NearByText = styled.Text`
  font-size: 10px;
  margin: 5px;
`;

const Presenter = ({
  rooms,
  onScroll,
  mapRef,
  currentIndex,
  setCurrentIndex,
  onMapMoved,
  nearBy,
}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <MapView
        style={StyleSheet.absoluteFill}
        onRegionChangeComplete={onMapMoved}
        //provider={PROVIDER_GOOGLE}
        ref={mapRef}
        camera={{
          center: {
            latitude: parseFloat(rooms[0].lat),
            longitude: parseFloat(rooms[0].lng),
          },
          altitude: 1000,
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
          >
            <RoomMarker
              selected={room.id === rooms[currentIndex].id}
              price={room.price}
            />
          </Marker>
        ))}
      </MapView>
      {nearBy?.length > 0 && (
        <NearByContainer>
          <NearByText>
            Rooms near by: {utils.plural(nearBy.length, "room")}
          </NearByText>
          <NearByScrollView horizontal showsHorizontalScrollIndicator={false}>
            {nearBy?.map((room) => (
              <NearByImage
                key={room.id}
                source={
                  room.photos.length > 0
                    ? { uri: room.photos[0].file }
                    : utils.defaultImage
                }
              />
            ))}
          </NearByScrollView>
        </NearByContainer>
      )}
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
