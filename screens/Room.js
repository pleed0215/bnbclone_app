import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import RoomPhoto from "../Components/RoomPhoto";
import ThemeColor from "../color";
import utils from "../utils";

const Container = styled.View`
  width: 100%;
  flex: 1;
`;

const DataContainer = styled.View`
  padding: 0px;
`;

const Address = styled.Text`
  font-size: 24px;
  margin-top: 10px;
  padding-left: 10px;
`;

const PropertyInfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  padding-left: 10px;
`;
const PropertyInfoData = styled.View`
  background-color: ${ThemeColor.green};

  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
`;
const PropertyInfoText = styled.Text`
  color: white;
  font-weight: 500;
`;
const CheckTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CheckContainer = styled.View`
  margin-top: 30px;
  padding-left: 20px;
`;

const CheckTitle = styled.Text`
  font-size: 18px;
  margin-left: 10px;
`;

const CheckTime = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const CheckTimeText = styled.Text`
  margin-left: 5px;
`;

const MapContainer = styled.View`
  width: 100%;
  height: 400px;
`;

export default ({ route, navigation }) => {
  const {
    params: { room },
  } = route;

  const { check_in, check_out } = room;

  useEffect(() => {
    navigation.setOptions({ title: room.name });
  }, []);

  return (
    <Container>
      <ScrollView style={{ width: "100%" }} contentContainerStyle={{}}>
        <RoomPhoto
          disabled
          photos={room.photos}
          room={room}
          disabled
          factor={2}
        />

        <Address>{room.address}</Address>
        <DataContainer>
          <PropertyInfoContainer>
            {room.beds > 0 && (
              <PropertyInfoData>
                <PropertyInfoText>
                  {utils.plural(room.beds, "bed")}
                </PropertyInfoText>
              </PropertyInfoData>
            )}
            {room.bedrooms > 0 && (
              <PropertyInfoData>
                <PropertyInfoText>
                  {utils.plural(room.bedrooms, "bedroom")}
                </PropertyInfoText>
              </PropertyInfoData>
            )}
            {room.bathrooms > 0 && (
              <PropertyInfoData>
                <PropertyInfoText>
                  {utils.plural(room.bathrooms, "bathroom")}
                </PropertyInfoText>
              </PropertyInfoData>
            )}
          </PropertyInfoContainer>
          <CheckContainer>
            <CheckTitleContainer>
              <Ionicons
                name={utils.isAndroid() ? "md-timer" : "ios-timer"}
                size={24}
              />
              <CheckTitle>Check-in / Check-out</CheckTitle>
            </CheckTitleContainer>
            <CheckTime>
              <Ionicons
                name={utils.makeIconName("log-in")}
                size={18}
                style={{ marginRight: 8 }}
              />
              <CheckTimeText>
                Check in: {utils.makeTime(room.check_in)}
              </CheckTimeText>
              <Ionicons
                name={utils.makeIconName("log-out")}
                size={18}
                style={{ marginLeft: 30 }}
              />
              <CheckTimeText>
                Check out: {utils.makeTime(room.check_out)}
              </CheckTimeText>
            </CheckTime>
          </CheckContainer>
          <MapContainer>
            <MapView
              provider={PROVIDER_GOOGLE}
              camera={{
                center: {
                  latitude: 35.8140611, //parseFloat(room.lat),
                  longitude: 128.5264914, //parseFloat(room.lng),
                },
                altitude: 0,
                pitch: 0,
                heading: 0,
                zoom: 19,
              }}
              style={{ height: "100%", width: "100%" }}
            >
              <Marker
                coordinate={{
                  longitude: 128.5264194, // parseFloat(room.lng),
                  latitude: 35.8140611, //parseFloat(room.lat),
                }}
              />
            </MapView>
          </MapContainer>
        </DataContainer>
      </ScrollView>
    </Container>
  );
};
