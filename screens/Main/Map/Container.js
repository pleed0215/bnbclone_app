import React, { useState, useEffect, useRef } from "react";
import api from "../../../api";
import utils from "../../../utils";
import Presenter from "./Presenter";

export default ({ rooms, token }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mapRef = useRef();

  const onScroll = ({ nativeEvent: { contentOffset } }) => {
    const { x } = contentOffset;
    const index = Math.abs(Math.floor(x / utils.screenWidth));

    if (currentIndex != index) setCurrentIndex(index);
  };
  const onMapMoved = (region) => {
    mapRef?.current
      ?.getMapBoundaries()
      .then(({ northEast, southWest }) => {
        const { latitude: lat1, longitude: lng1 } = northEast;
        const { latitude: lat2, longitude: lng2 } = southWest;
        return api.search(token, { lat1, lng1, lat2, lng2 });
      })
      .then((rooms) => console.log(rooms));
  };

  useEffect(() => {
    mapRef?.current?.animateCamera(
      {
        center: {
          latitude: parseFloat(rooms[currentIndex].lat),
          longitude: parseFloat(rooms[currentIndex].lng),
        },
        altitude: 500,
        pitch: 0,
        heading: 0,
        zoom: 18,
      },
      { duration: 1000 }
    );
  }, [currentIndex]);
  return (
    <Presenter
      rooms={rooms}
      onScroll={onScroll}
      mapRef={mapRef}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      onMapMoved={onMapMoved}
    />
  );
};
