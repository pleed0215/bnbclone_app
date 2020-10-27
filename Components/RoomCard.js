import React from "react";
import PropTypes from "prop-types";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import utils from "../utils";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

import RoomPhoto from "./RoomPhoto";
import ThemeColor from "../color";
import { toggleFavs } from "../redux/roomSlice";

const Container = styled.View`
  width: 100%;
  margin-bottom: 25px;
  align-items: flex-start;
`;
const Name = styled.Text`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 7px;
`;
const Price = styled.Text``;
const PriceContainer = styled.View`
  flex-direction: row;
  font-size: 16px;
`;
const PriceNumber = styled.Text`
  font-weight: 600;
`;

const SuperHost = styled.View`
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 5px;
  width: 90px;
  align-items: center;
`;
const SuperHostText = styled.Text`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
`;

const PhotosContainer = styled.View`
  height: ${height / 4}px;
  width: 100%;
  margin-bottom: 25px;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  z-index: 0;
`;

const FavButton = styled.View`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  padding: 5px;
  width: 35px;
  height: 35px;
  top: 20px;
  right: 20px;
  z-index: 10;
  align-items: center;
  justify-content: center;
  border: 2px gray solid;
`;

const RoomCard = ({
  id,
  in_favorite,
  isSuperHost,
  photos,
  name,
  rating,
  price,
  room,
}) => {
  const iconPrefix = utils.isAndroid() ? "md-" : "ios-";
  const iconName = in_favorite
    ? iconPrefix + "heart"
    : iconPrefix + "heart-empty";
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Container>
      <PhotosContainer>
        <FavButton>
          <TouchableOpacity
            onPress={() => {
              dispatch(toggleFavs(id));
            }}
          >
            <Ionicons
              size={20}
              color={in_favorite ? ThemeColor.red : "black"}
              name={iconName}
            />
          </TouchableOpacity>
        </FavButton>

        <RoomPhoto photos={photos} room={room} />
      </PhotosContainer>

      <TouchableOpacity
        onPress={() => navigation.navigate("RoomDetail", { room })}
      >
        {isSuperHost && (
          <SuperHost>
            <SuperHostText>Superhost</SuperHostText>
          </SuperHost>
        )}
        <Name>{name}</Name>
        <PriceContainer>
          <PriceNumber>${price}</PriceNumber>
          <Price> / night</Price>
        </PriceContainer>
      </TouchableOpacity>
    </Container>
  );
};

RoomCard.propTypes = {
  id: PropTypes.number.isRequired,
  in_favorite: PropTypes.bool.isRequired,
  isSuperHost: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.string.isRequired,
    })
  ),
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default RoomCard;

// react native swiper version.
/* <Swiper
          autoplay
          paginationStyle={{ marginBottom: -15 }}
          activeDotColor={"white"}
          dotColor={"rgba(200,200,200,0.8)"}
        ></Swiper> */
