import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";

import styled from "styled-components/native";

import Swiper from "react-native-web-swiper";
//import Swiper from "react-native-swiper";
import utils from "../utils";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const ImageView = styled.View`
  width: 100%;
  height: ${(props) => height / props.factor}px;
`;

const DefaultImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export default ({ photos, room, disabled, factor = 4 }) => {
  const navigation = useNavigation();
  return (
    <ImageView factor={factor}>
      {photos?.length === 0 ? (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => navigation.navigate("RoomDetail", { room })}
        >
          <DefaultImage source={utils.defaultImage} />
        </TouchableOpacity>
      ) : (
        <Swiper
          timeout={2}
          loop
          from={1}
          containerStyle={{ width: "100%", flex: 1 }}
          sprintConfig={{ speed: 11 }}
          controlsProps={{
            PrevComponent: () => null,
            NextComponent: () => null,
            dotActiveStyle: {
              backgroundColor: "white",
            },
          }}
        >
          {photos?.map((photo) => (
            <TouchableOpacity
              disabled={disabled}
              key={photo.caption}
              onPress={() => navigation.navigate("RoomDetail", { room })}
            >
              <SlideImage key={photo.caption} source={{ uri: photo.file }} />
            </TouchableOpacity>
          ))}
        </Swiper>
      )}
    </ImageView>
  );
};
/*
<Swiper
            timeout={2}
            loop
            from={1}
            sprintConfig={{ speed: 11 }}
            controlsProps={{
              PrevComponent: () => null,
              NextComponent: () => null,
              dotActiveStyle: {
                backgroundColor: "white",
              },
            }}
          ></Swiper>
          
          <Swiper
      autoplay
      paginationStyle={{ marginBottom: -15 }}
      activeDotColor={"white"}
      dotColor={"rgba(200,200,200,0.8)"}
    >*/
