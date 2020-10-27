import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";

import styled from "styled-components/native";

import Swiper from "react-native-web-swiper";
//import Swiper from "react-native-swiper";
import utils from "../utils";

const { width, height } = Dimensions.get("screen");

const DefaultImageView = styled.View`
  width: 100%;
  height: 100%;
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

export default ({ photos }) => {
  return photos.length === 0 ? (
    <DefaultImageView>
      <DefaultImage source={utils.defaultImage} />
    </DefaultImageView>
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
      {photos.map((photo) => (
        <SlideImage key={photo.caption} source={{ uri: photo.file }} />
      ))}
    </Swiper>
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
