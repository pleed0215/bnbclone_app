import React, { useState, useEffect, useRef } from "react";
import utils from "../../../utils";
import Presenter from "./Presenter";

export default ({ rooms }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mapRef = useRef();

  const onScroll = ({ nativeEvent: { contentOffset } }) => {
    const { x } = contentOffset;
    const index = Math.abs(Math.floor(x / utils.screenWidth));

    if (currentIndex != index) setCurrentIndex(index);
  };
  const onMapMoved = (region) => {
    const { lattitude, longitude } = region;
    mapRef?.current?.getMapBoundaries().then(({ northEast, southWest }) => {
      console.log(northEast, southWest);
    });
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
